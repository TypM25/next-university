"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import LoadingMui from '@/components/loadingMui';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/all/student`;
const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/student`;

const dropdown = [
    { value: "student_id", name: "Student ID" },
    { value: "student_first_name", name: "Firstname" },
    { value: "student_last_name", name: "Lastname" },
    { value: "user_id", name: "User ID" },
    { value: "createdAt", name: "Created Date" },
    { value: "create_by", name: "Created By" },
];


export default function StudentAll() {
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState("")
    const [searchType, setSearchType] = useState("student_id")
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

        }
        searchUser()
    }, [searchData, searchType])

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
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>นิสิตที่ลงทะเบียน</h1>
            <div className='w-full flex flex-col justify-center items-center'>
                <Filter filter={dropdown} handleDropdown={handleDropdown} handleChange={handleChange} />
                <div className='flex flex-col justify-center items-center w-[100%] min-w-[20px] overflow-x-auto overflow-y-auto'>
                    {data.length === 0 ? (
                        <LoadingMui />
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-white uppercase bg-[#8E1616] text-center">
                                <tr>
                                    <th scope="col" className="text-lg px-6 py-3">รหัสนิสิต</th>
                                    <th scope="col" className="text-lg px-6 py-3">ชื่อจริง</th>
                                    <th scope="col" className="text-lg px-6 py-3">นามสกุล</th>
                                    <th scope="col" className="text-lg px-6 py-3">เทอมการศึกษา</th>
                                   
                                    <th scope="col" className="text-lg px-6 py-3">รหัสผู้ใช้</th>
                                    <th scope="col" className="text-lg px-6 py-3">สร้างโดย</th>
                                     <th scope="col" className="text-lg px-6 py-3">วันที่สร้าง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.length > 0 ?
                                    (data.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-300">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-white text-center text-xl">
                                                {item.student_id}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm bg-gray-50
                                        lg:text-xl">
                                                {item.student_first_name}
                                            </td>
                                            <td className="px-6 py-4 bg-white text-center text-lg
                                        lg:text-zl">
                                                {item.student_last_name}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm bg-gray-50
                                        lg:text-xl">
                                                {item.term_id}
                                            </td>
                                            <td className="px-6 py-4 bg-white text-center text-lg
                                        lg:text-zl">
                                                {item.user_id}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm bg-gray-50
                                        lg:text-xl">
                                                {item.create_by}
                                            </td>
                                            <td className="px-6 py-4 bg-white text-center text-lg
                                        lg:text-zl">
                                                {item.createdAt}
                                            </td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-6 text-center text-lg text-gray-400 bg-gray-100">
                                                ไม่มีข้อมูลรายวิชา
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    )
}



