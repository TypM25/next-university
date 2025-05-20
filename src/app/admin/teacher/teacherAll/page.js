"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/all/teacher`;
// const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/teacher`;

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
    const search = {
        searchType: searchType,
        searchData: searchData
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

    // useEffect(() => {
    //     async function searchUser() {
    //         try {
    //             const response = await axios.post(API_URL_SEARCH, search)
    //             setData(response.data.data)
    //             console.log(response.data.data)
    //         }
    //         catch (error) {
    //             console.log("Error fetching.")
    //         }

    //     }
    //     searchUser()
    // }, [searchData, searchType])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(API_URL)
                setData(response.data.data)
                console.log(response.data.data)
            }
            catch (error) {
                console.log("Error fetching.")
            }
        }
        fetchData();
    }, [])

    return (
         <div className='flex flex-col w-screen px-10 py-20 justify-center items-center'>
                    <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>อาจารย์ที่ลงทะเบียน</h1>
                    <div className='w-full flex flex-col justify-center items-center'>
                        {/* <Filter filter={dropdown} handleDropdown={handleDropdown} handleChange={handleChange} /> */}
                        <div className='flex flex-col justify-center items-center w-[100%] min-w-[20px] overflow-x-auto overflow-y-auto'>
                            <Table data={data} />
                        </div>
                    </div>
                </div>
    )
}



