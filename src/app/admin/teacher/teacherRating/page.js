"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import { useDebounce } from 'use-debounce';

const dropdown = [
    { value: "teacher_id", name: "Teacher ID" },
    { value: "term_id", name: "Term ID" },
    { value: "avg_score", name: "Average score" },
    { value: "rating_score", name: "Rating score" },
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

    async function fetchData() {
        try {
            //ดึงข้อมูลteacherRatingทั้งหมด พร้อมฟังชั่นsearch
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/search/teacherRating`, debouncedSearchConfig)
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
        fetchData();
    }, [debouncedSearchConfig])

    return (
        <div className='flex flex-col w-full px-10 py-20 justify-center items-center lg:w-[70%]'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>เรตติ้งอาจารย์</h1>
            <div className='w-full flex flex-col justify-center items-center gap-3
                  md:w-[60%]
                  lg:w-full'>
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



