"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import LoadingMui from '@/components/loadingMui';
import { useDebounce } from 'use-debounce';

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
    const [sort, setSort] = useState("ASC")
    const [isLoading, setIsLoading] = useState(true)

    const [debouncedSearchData] = useDebounce(searchData, 500);
    const [debouncedSearchType] = useDebounce(searchType, 500);
    const [debouncedSort] = useDebounce(sort, 500);
    const payload = {
        searchData: debouncedSearchData,
        searchType: debouncedSearchType,
        sort: debouncedSort
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
    }, [debouncedSearchData, debouncedSearchType, debouncedSort]);

    return (
        <div className='flex flex-col w-screen px-10 py-20 justify-center items-center'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>นิสิตที่ลงทะเบียน</h1>
            <div className='w-full flex flex-col justify-center items-center md:w-fit'>
                <Filter
                    filter={dropdown}
                    handleDropdown={handleDropdown}
                    handleChange={handleChange}
                    handleRadio={handleRadio}
                />
                <div className='flex flex-col justify-center items-center w-[100%] min-w-[20px] overflow-x-auto overflow-y-auto'>
                    {isLoading ? (
                        <LoadingMui />
                    ) : (

                        <div className="w-auto h-auto overflow-x-auto max-w-full max-h-[400px] 
                    md:flex md:justify-center">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-white uppercase bg-[#8E1616] text-center">
                                    <tr>
                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">รหัสนิสิต</th>
                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">ชื่อจริง</th>
                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">นามสกุล</th>
                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">เทอมการศึกษา</th>

                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">รหัสผู้ใช้</th>
                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">สร้างโดย</th>
                                        <th scope="col" className="text-sm p-1 md:px-6 md:py-3 md:text-lg">วันที่สร้าง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.length > 0 ?
                                        (data.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-200 dark:border-gray-300">
                                                <td className="p-1 font-medium text-gray-900 whit espace-nowrap bg-white text-center 
                                                md:text-xl">
                                                    {item.student_id}
                                                </td>
                                                <td className="p-1 text-center text-sm bg-gray-50 
                                        md:px-6 md:py-4 md:text-xl ">
                                                    {item.student_first_name}
                                                </td>
                                                <td className="p-1 bg-white text-center text-sm
                                         md:md:px-6 md:py-4 md:text-xl">
                                                    {item.student_last_name}
                                                </td>
                                                <td className="p-1 text-center text-sm bg-gray-50 
                                        md:px-6 md:py-4 md:text-xl ">
                                                    {item.term_id}
                                                </td>
                                                <td className="p-1 bg-white text-center text-sm
                                         md:md:px-6 md:py-4 md:text-xl">
                                                    {item.user_id}
                                                </td>
                                                <td className="p-1 text-center bg-gray-50  text-sm
                                        md:px-6 md:py-4 md:text-xl ">
                                                    {item.create_by}
                                                </td>
                                                <td className="p-1 bg-white text-center text-sm
                                        md:px-6 md:py-4 md:text-xl">
                                                    {item.createdAt}
                                                </td>
                                            </tr>
                                        ))) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-6 text-center text-sm text-gray-400 bg-gray-100">
                                                    ไม่มีข้อมูลรายวิชา
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}



