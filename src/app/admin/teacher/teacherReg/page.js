"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import AuthService from '@/services/auth.service'


const API_URL = process.env.NEXT_PUBLIC_API_URL + "/admin/create/teacher";

export default function TeacherReg() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [user_id, setUser_id] = useState("")
    // const [token, settoken] = useState("")
    const data = {
        user_id: user_id,
        teacher_first_name: firstname,
        teacher_last_name: lastname
    }
    const router = useRouter();

    function handleChange(e) {
        const id = e.target.id
        if (id === 'user_id') {
            setUser_id(e.target.value)
        }
        else if (id === 'firstname') {
            setFirstname(e.target.value)
        }
        else if (id === 'lastname') {
            setLastname(e.target.value)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //เรียกtoken เพื่อใส่header
            // AuthService.getToken();
            const response = await axios.post(API_URL, data);

            console.log(response.message)
            if (response.status === 200) {
                alert(response.data.message)

            }
        }
        catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) || error.message

            alert(resMessage);
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-full p-10  md:p-20'>
            <form className='flex flex-col w-2/3 lg:w-[450px]'>
                <label className='text-center mb-10 text-3xl font-semibold text-[#8E1616]'>ลงทะเบียนอาจารย์</label>
                <p className='self-start font-semibold text-xl text-black/70'>รหัสผู้ใช้</p>
                <input id='user_id' onChange={handleChange} className='w-full my-4 py-2 px-4 rounded-full bg-white font-light text-lg' type='text'></input>
                <p className='self-start font-semibold text-xl text-black/70'>ชื่อ</p>
                <input id='firstname' onChange={handleChange} className='w-full my-4 py-2 px-4 rounded-full bg-white font-light text-lg' type='text'></input>
                <p className='self-start font-semibold text-xl text-black/70'>นามสกุล</p>
                <input id='lastname' onChange={handleChange} className='w-full my-4 py-2 px-4 rounded-full bg-white font-light text-lg' type='text'></input>
                <button type="submit" onClick={handleSubmit} className='mt-10 cursor-pointer self-center w-20 p-2 text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040] text-base'>ยืนยัน</button>
            </form>
        </div>
    )
}
