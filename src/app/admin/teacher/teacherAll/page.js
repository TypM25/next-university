"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/all/teacher`;
const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/teacher`;

const dropdown = [
    { value: "teacher_id", name: "teacher ID" },
    { value: "teacher_first_name", name: "Firstname" },
    { value: "teacher_last_name", name: "Lastname" },
    { value: "user_id", name: "User ID" },
    { value: "createdAt", name: "Created Date" },
    { value: "create_by", name: "Created By" },
];

export default function TeacherAll() {
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState("")
    const [searchType, setSearchType] = useState("teacher_id")
    const [sort, setSort] = useState("ASC")
    const [isLoading, setIsLoading] = useState(true)
    const search = {
        searchType: searchType,
        searchData: searchData,
        sort: sort
    }

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

    useEffect(() => {
        async function searchUser() {
            try {
                const response = await axios.post(API_URL_SEARCH, search)
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
        searchUser()
    }, [searchData, searchType, sort])

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await axios.get(API_URL)
    //             setData(response.data.data)
    //             console.log(response.data.data)
    //         }
    //         catch (error) {
    //             console.log("Error fetching.")
    //         }
    //     }
    //     fetchData();
    // }, [])

    return (
        <div className='flex flex-col w-full px-10 py-20 justify-center items-center md:w-[70%]'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>อาจารย์ที่ลงทะเบียน</h1>
            <div className='w-full flex flex-col justify-center items-center md:w-full'>
                <Filter
                    filter={dropdown}
                    handleDropdown={handleDropdown}
                    handleChange={handleChange}
                    handleRadio={handleRadio}
                />
                <div className="w-auto h-auto overflow-x-auto max-w-full max-h-[400px] 
                    md:flex md:justify-center">
                    <Table isLoading={isLoading} data={data} />
                </div>
            </div>
        </div>
    )
}



