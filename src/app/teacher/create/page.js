"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'

export default function CreateTeacher() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    // const [token, settoken] = useState("")
    const data = {
        teacher_first_name: firstname,
        teacher_last_name: lastname
    }
    const router = useRouter();

    //ลงทะเบียนอาจารย์
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //ลงทะเบียนอาจารย์
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/teacher/create", data);
            console.log(response.message)
            if (response.status === 200) {
                alert(response.data.message)
                router.push('/teacher')
                //รีเฟรช
                setTimeout(() => {
                    window.location.reload(); // บังคับโหลดหน้าใหม่
                }, 100);
            }
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <form className='flex flex-col w-5/6 lg:w-[450px]'>
                <label className='text-center mb-10 text-3xl font-semibold'>ลงทะเบียนอาจารย์</label>
                <p className='self-start font-semibold'>ชื่อ</p>
                <input id='firstname' onChange={(e) => setFirstname(e.target.value)} className='w-full p my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text'></input>
                <p className='self-start font-semibold'>นามสกุล</p>
                <input id='lastname' onChange={(e) => setLastname(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text'></input>
                <button type="submit" onClick={handleSubmit} className='mt-10 cursor-pointer self-center w-20 p-2 bg-amber-300 rounded-full hover:bg-amber-400 hover:text-white'>ยืนยัน</button>

            </form>
        </div>
    )
}
