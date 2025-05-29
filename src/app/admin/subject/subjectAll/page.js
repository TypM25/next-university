"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import LoadingMui from '@/components/loadingMui';
import { useDebounce } from 'use-debounce';

const API_URL_SEARCH = `${process.env.NEXT_PUBLIC_API_URL}/admin/search/subject`;

const dropdown = [

    { value: "subject_id", name: "ID" },
    { value: "subject_name", name: "Name" },
    { value: "createdAt", name: "Created Date" },
    { value: "create_by", name: "Created By" },
];

export default function SubjectAll() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  const [searchConfig, setSearchConfig] = useState({
          searchData: "",
          searchType: "subject_id",
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
        <div className='flex flex-col w-screen px-10 py-20 justify-center items-center'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>รายวิชาที่ลงทะเบียน</h1>
            <div className='w-full flex flex-col justify-center items-center md:w-fit'>
                <Filter
                    filter={dropdown}
                    handleChange={handleChange}
                />
                <div className='flex flex-col justify-center items-center w-[100%] min-w-[20px] overflow-x-auto overflow-y-auto'>
                    <Table isLoading={isLoading} data={data} />
                </div>

            </div>
        </div>
    )
}

