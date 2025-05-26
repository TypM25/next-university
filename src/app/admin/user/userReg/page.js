"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import AuthService from '@/services/auth.service'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const API_URL = process.env.NEXT_PUBLIC_API_URL + "/admin/create/user";

export default function UserReg() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("")
    const roles = [
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Admin', value: 'admin' }
    ];

    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState("")

    const router = useRouter();

    function handleChange(e) {
        const id = e.target.id
        if (id === 'username') {
            setUsername(e.target.value)
        }
        if (id === 'password') {
            setPassword(e.target.value)
        }
        if (id === 'confirmPassword') {
            setConfirmPassword(e.target.value)
        }
    }

    //value คือค่าของkeyที่ชื่อvalueใน Autocomplete
      function handleSelectRoles(event, value) {
        setRole(value ? value.value : null); // value.value คือ ค่าวาลู่ในroles
    }
 

    async function handleSubmit(e) {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError(true)
            return setErrMes("กรุณากรอกข้อมูลให้ครบ")
        }
        if (password != confirmPassword) {
            setError(true)
            return setErrMes('รหัสไม่ตรงกัน')
        }

        try {
            const response = await AuthService.register(username, password, role);
            if (response) {
                setError(false)
                alert(response.data.message)
            }
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) || error.message
            setError(true)
            setErrMes(resMessage);

        }
    }

    return (
        <div className='flex flex-col p-20 items-center w-full h-auto'>
            <h1 className='mb-10 text-3xl font-bold text-[#8E1616]'>ลงทะเบียนผู้ใช้งาน</h1>
            <form className='flex flex-col w-5/6 lg:w-[40%]'>
                <ul className="w-full flex flex-col gap-6">
                    <li >
                        <p className='self-start text-xl font-semibold text-black/70 '>ชื่อผู้ใช้</p>
                        <input id='username' onChange={handleChange} className='w-full p my-4 py-2 px-4 rounded-full bg-white font-light' type='text' ></input>
                    </li>
                    <li>
                        <p className='self-start text-xl font-semibold text-black/70'>รหัสผ่าน</p>
                        <input id='password' onChange={handleChange} className='w-full py-2 px-4 rounded-full bg-white font-light' type='password' ></input>
                    </li>
                    <li >
                        <p className='self-start text-xl font-semibold text-black/70'>ยืนยันรหัสผ่าน</p>
                        <input id='confirmPassword' onChange={handleChange} className='w-full py-2 px-4 rounded-full bg-white font-light' type='password' ></input>
                    </li>
                    <li >
                        <Autocomplete
                            onChange={handleSelectRoles}
                            value={roles.find(r => r.value === role) || null}
                            disablePortal
                            options={roles}
                            getOptionLabel={(option) => option.label}
                            sx={{ width: 220, height: 65 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Roles"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'rgba(0,0,0,0.7)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(0,0,0,0.7)', 
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'rgba(0,0,0,0.7)', 
                                            },
                                            color: 'rgba(0,0,0,0.7)', 
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'rgba(0,0,0,0.7)',
                                            '&.Mui-focused': {
                                                color: 'rgba(0,0,0,0.7)', 
                                            },
                                        },
                                    }}
                                />

                            )}
                        />
                    </li>
                </ul>
                {
                    error && <div className="flex items-center p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{errMes}</span>
                        </div>
                    </div>
                }

                <button type="submit" onClick={handleSubmit} className='self-center w-20 p-2 mt-7 rounded-full  rounded-full text-white bg-[#A31D1D] hover:bg-[#D84040]'>
                    Sumit</button>


            </form>
        </div >
    )
}
