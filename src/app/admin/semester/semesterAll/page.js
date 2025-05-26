"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import { useDebounce } from 'use-debounce';
import LoadingMui from '@/components/loadingMui';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/semester`;

const dropdown = [
    { value: "term_id", name: "Term ID" },
    { value: "term_name", name: "Term Name" },
    { value: "is_open", name: "Status" },
    { value: "start_date", name: "Start Date" },
    { value: "end_date", name: "End Date" },
];


export default function SemestertAll() {
    const [checkbox, setCheckbox] = useState({
        isTrue: true, //ติ้ก
        isFalse: true, //ตื้ก
    });

    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState("")
    const [searchType, setSearchType] = useState("term_id")
    const [sort, setSort] = useState("ASC")

    const [isLoading, setIsLoading] = useState(true)

    const [debouncedSearchData] = useDebounce(searchData, 500);
    const [debouncedSearchType] = useDebounce(searchType, 500);
    const [debouncedSort] = useDebounce(sort, 500);
    const [debouncedCheckbox] = useDebounce(checkbox, 500);
    const payload = {
        searchData: debouncedSearchData,
        searchType: debouncedSearchType,
        sort: debouncedSort,
        status: debouncedCheckbox
    };

    async function handleChange(e) {
        const id = e.target.id
        if (id === 'search') {
            setSearchData(e.target.value)
        }
    }

    async function handleDropdown(e) {
        setSearchType(e.target.value)
    }
    async function handleRadio(e) {
        setSort(e.target.value)
    }

    async function handleCheckBox(e) {
        const id = e.target.id;
        const checked = e.target.checked;

        setCheckbox((prev) => (
            {
                ...prev,
                [id]: checked,
            }
        )
        );
    }

    async function searchUser() {
        try {
            const response = await axios.post(API_URL_SEARCH, payload)
            setData(response.data.data)
            console.log(response.data.data)
        }
        catch (error) {
            console.log("Error fetching.")
        }
        finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        searchUser()
    }, [debouncedSearchData, debouncedSearchType, debouncedSort, debouncedCheckbox]);

    return (
        <div className='flex flex-col w-screen px-10 py-20 justify-center items-center'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>เทอมการศึกษา</h1>
            <div className='w-full flex flex-col justify-center items-center md:w-fit'>
                <Filter
                    filter={dropdown}
                    handleDropdown={handleDropdown}
                    handleChange={handleChange}
                    handleRadio={handleRadio}
                />


                <form name="status" className='self-start mb-4 flex gap-4'>
                    <div className='flex gap-1 justify-center items-center'>
                        <input id="isTrue" checked={checkbox.isTrue} onChange={handleCheckBox} type="checkbox" name="status" />
                        <label className='text-lg text-[#8E1616]'>true</label>
                    </div>
                    <div className='flex gap-1 justify-center items-center'>
                        <input id="isFalse" checked={checkbox.isFalse} onChange={handleCheckBox} type="checkbox" name="status" />
                        <label className='text-lg text-[#8E1616]'>false</label>
                    </div>
                </form>
                <div className='flex flex-col justify-center items-center w-[100%] min-w-[20px] overflow-x-auto overflow-y-auto'>
                    <Table isLoading={isLoading} data={data} />
                </div>

            </div>
        </div>
    )
}

