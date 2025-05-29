"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Filter from '@/components/all/filter'
import LoadingMui from '@/components/loadingMui'
import { useDebounce } from 'use-debounce';

const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/user`;

const dropdown = [
    {
        value: "user_id",
        name: "ID"
    },
    {
        value: "username",
        name: "Username"
    },
    {
        value: "createdAt",
        name: "CreatedAt"
    },
]

export default function UserAll() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
const [searchConfig, setSearchConfig] = useState({
        searchData: "",
        searchType: "user_id",
        sort: "ASC"
    });

    const [debouncedSearchConfig] = useDebounce(searchConfig, 500);

    async function handleChange(e) {
        const {name, value} = e.target
        setSearchConfig((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function searchUser() {
        try {
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
        searchUser()
    }, [debouncedSearchConfig]);

    return (
        <div className="flex flex-col w-screen px-10 py-20 justify-center items-center ">
            <h1 className="mb-10 text-3xl font-bold text-[#8E1616]">ผู้ใช้ที่ลงทะเบียน</h1>
            <div className="w-full flex flex-col justify-center items-center md:w-fit">
                <Filter
                    filter={dropdown}
                    handleChange={handleChange}
                />

                {isLoading ?
                    (<LoadingMui />) : (
                        <div className="w-auto h-auto overflow-x-auto max-w-full max-h-[400px] 
                    md:flex md:justify-center">
                            <table className="h-full h-full text-left text-gray-500 text-sm
                        md:scale-[100%]">
                                <thead className="sticky top-0 text-xs text-white uppercase bg-[#8E1616] text-center">
                                    <tr>
                                        <th scope="col" className="text-sm px-6 py-3 md:text-lg">รหัสผู้ใช้งาน</th>
                                        <th scope="col" className="text-sm px-6 py-3 md:text-lg">ชื่อผู้ใช้</th>
                                        <th scope="col" className="text-sm px-6 py-3 md:text-lg">รหัสผ่าน</th>
                                        <th scope="col" className="text-sm px-6 py-3 md:text-lg">วันที่สร้าง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.length > 0 ?
                                        (data.map((item, index) =>
                                        (<tr key={index} className="border-b border-gray-200 dark:border-gray-300">
                                            <td className="p-1 font-medium text-gray-900 whitespace-nowrap bg-white text-center text-sm
                                        md:text-xl">
                                                {item.user_id}
                                            </td>
                                            <td className="p-1 text-center text-sm bg-gray-200
                                        md:px-6 md:py-4 md:text-lg">
                                                {item.username}
                                            </td>
                                            <td className="p-1 bg-white text-center text-sm 
                                        md:px-6 md:py-4 md:text-lg">
                                                {item.password}
                                            </td>
                                            <td className="p-1 text-center text-sm bg-gray-50 
                                        md:px-6 md:py-4 md:text-lg">
                                                {item.createdAt}
                                            </td>
                                        </tr>
                                        )))
                                        : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-6 text-center text-lg text-gray-400 bg-gray-100">
                                                    ไม่มีข้อมูล
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>

                        </div>

                    )}
            </div>
        </div>
    )
}


