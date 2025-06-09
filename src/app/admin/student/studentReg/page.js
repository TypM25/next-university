"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import AuthService from '@/services/auth.service'




export default function StudentReg() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [user_id, setUser_id] = useState("")

    //เก็บdata ไว้ post
    const data = { 
        user_id: user_id, //adminสามารถระบุได้ว่าจะลงทะเบียนนิสิตuserคนไหน
        student_first_name: firstname, 
        student_last_name: lastname 
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //ลงทะเบียนนิสิต
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/admin/create/student", data);

            console.log(response.message)
            if (response.status === 200) {
                alert(response.data.message)
              
            }
        }
        catch (error) {
            alert(error.response?.data?.message);
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-full p-10 lg:p-20'>
            <form className='flex flex-col w-2/3 lg:w-[450px]'>
              <label className='inline text-center mb-10 text-3xl font-semibold text-[#8E1616]'>ลงทะเบียนนิสิต</label>
                <p className='self-start font-semibold text-xl text-black/70'>รหัสผู้ใช้</p>
                <input id='user_id' onChange={(e) =>  setUser_id(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-white font-light' type='text'></input>
                <p className='self-start font-semibold text-xl text-black/70'>ชื่อ</p>
                <input id='firstname' onChange={(e) =>  setFirstname(e.target.value)} className='w-full p my-4 py-2 px-4 rounded-full bg-white font-light' type='text'></input>
                <p className='self-start font-semibold text-xl text-black/70'>นามสกุล</p>
                <input id='lastname' onChange={(e) =>  setLastname(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-white font-light' type='text'></input>
                <button type="submit" onClick={handleSubmit} className='mt-10 cursor-pointer self-center w-20 p-2  text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]'>ยืนยัน</button>
            </form>
        </div>
    )
}
