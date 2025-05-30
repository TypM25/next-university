"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import { useDebounce } from 'use-debounce';

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
    const [isLoading, setIsLoading] = useState(true)
    const [searchConfig, setSearchConfig] = useState({
        searchData: "",
        searchType: "teacher_id",
        sort: "ASC"
    });

    const [debouncedSearchConfig] = useDebounce(searchConfig, 500);

    async function handleChange(e) {
        const { name, value } = e.target
        setSearchConfig((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    async function searchUser() {
        try {
            //ดึงข้อมูลteacherทั้งหมด พร้อมฟังชั่นsearch
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/search/teacher`, debouncedSearchConfig)
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
    }, [debouncedSearchConfig])


    return (
        <div className='flex flex-col w-full px-10 py-20 justify-center items-center lg:w-[70%]'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>อาจารย์ที่ลงทะเบียน</h1>
            <div className='w-full flex flex-col justify-center items-center lg:w-full'>
                <Filter
                    filter={dropdown}
                    handleChange={handleChange}
                />
                <div className="w-auto h-auto overflow-x-auto max-w-full max-h-[400px] 
                    lg:flex lg:justify-center">
                    <Table isLoading={isLoading} data={data} />
                </div>
            </div>
        </div>
    )
}



