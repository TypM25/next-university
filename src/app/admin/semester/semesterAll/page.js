"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import { useDebounce } from 'use-debounce';

const dropdown = [
    { value: "term_id", name: "Term ID" },
    { value: "term_name", name: "Term Name" },
    { value: "start_date", name: "Start Date" },
    { value: "end_date", name: "End Date" },
];

export default function SemestertAll() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [searchConfig, setSearchConfig] = useState({
        searchData: "",
        searchType: "term_id",
        sort: "ASC",
        status: {
            isTrue: false,
            isFalse: false
        }
    });

    const [debouncedSearchConfig] = useDebounce(searchConfig, 500);

    function handleChange(e) {
        const { id, name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setSearchConfig((prev) => ({
                //ค่าkeyอื่น
                ...prev,
                status: {
                    //ค่าkeyย่อยของstatusอื่นๆ
                    ...prev.status,
                    [id]: checked
                }
            }));
        }
        else {
            setSearchConfig((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    //
    async function fetchSemester() {
        try {
            ////ดึงข้อมูลsemesterทั้งหมด พร้อมฟังชั่นsearch
            const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/semester`;
            const response = await axios.post(API_URL_SEARCH, debouncedSearchConfig)
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
        fetchSemester()
    }, [debouncedSearchConfig]);

    return (
        <div className='flex flex-col w-screen px-10 py-20 justify-center items-center'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>เทอมการศึกษา</h1>
            <div className='w-full flex flex-col justify-center items-center lg:w-fit'>
                <Filter
                    filter={dropdown}
                    handleChange={handleChange}
                />
                <form name="status" className='self-start mb-4 flex gap-4'>
                    <div className='flex gap-1 justify-center items-center'>
                        <input id="isTrue" checked={searchConfig.status.isTrue} type="checkbox" name="status" onChange={handleChange} />
                        <label className='text-lg text-[#8E1616]'>true</label>
                    </div>
                    <div className='flex gap-1 justify-center items-center'>
                        <input id="isFalse" checked={searchConfig.status.isFalse} type="checkbox" name="status" onChange={handleChange} />
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

