"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthService from '@/services/auth.service'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState(null)
    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState("")

    const roles = [
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Admin', value: 'admin' }
    ];

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
            return setErrMes('รหัสผ่านไม่ตรงกัน')
        }

        try {
            const response = await AuthService.register(username, password, role);
            if (response) {
                setError(false)
                alert("Register success!")
                router.push('/login');
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
        <div className="w-screen h-screen flex justify-center items-center bg-[#FEF9E1]">
            <div className='p-10% h-[70%] w-[80%] relative flex flex-col justify-center items-center shadow-xl shadow-yellow-500/50 rounded-[50px] bg-[#A31D1D] 
            lg:w-[30%]
           motion-scale-in-[0.5] motion-opacity-in-[0%] motion-duration-[300ms] motion-ease-spring-bouncier'>
                <img src="/img/hat2.png" alt="หมวก" className="absolute w-32 h-32 -top-17 
                    motion-preset-shake motion-duration-900" />
                <h1 className='text-5xl text-[#EEEEEE] mb-15 font-bold '>
                    ลงทะเบียน
                </h1>
                <form className='w-[70%] flex flex-col justify-center items-center'>
                    <ul className="w-full flex flex-col gap-6">
                        <li >
                            <p className='self-start text-xl font-semibold text-[#E5D0AC]'>ชื่อผู้ใช้</p>
                            <input id='username' onChange={handleChange} className='w-full py-2 px-4 rounded-full bg-gray-200 font-light' type='text' ></input>

                        </li>
                        <li>
                            <p className='self-start text-xl font-semibold text-[#E5D0AC]'>รหัสผ่าน</p>
                            <input id='password' onChange={handleChange} className='w-full py-2 px-4 rounded-full bg-gray-200 font-light' type='password' ></input>
                        </li>
                        <li >
                            <p className='self-start text-xl font-semibold text-[#E5D0AC]'>ยืนยันรหัสผ่าน</p>
                            <input id='confirmPassword' onChange={handleChange} className='w-full py-2 px-4 rounded-full bg-gray-200 font-light' type='password' ></input>
                        </li>
                        <li >
                            <Autocomplete
                                onChange={handleSelectRoles}
                                value={roles.find(r => r.value === role) || null}
                                disablePortal
                                options={roles}
                                getOptionLabel={(option) => option.label}
                                sx={{ width: '100%', height: 65 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Roles"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#E5D0AC',        // สีเส้นขอบปกติ
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#E5D0AC',        // สีเส้นขอบเวลาชี้เมาส์
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#E5D0AC',        // สีเส้นขอบเวลาคลิกโฟกัส
                                                },
                                                color: '#E5D0AC',                // สีตัวหนังสือในช่องกรอก
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#E5D0AC',                // สีป้าย label
                                                '&.Mui-focused': {
                                                    color: '#E5D0AC',              // สี label เวลาคลิกโฟกัส
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </li>
                    </ul>

                    {/* <select id="role" onChange={handleSelectRoles} value={role} className='flex justify-center text-center w-fit my-4 px-4 py-2 rounded-full  font-content bg-rose-200 '>
                        <option value="" disabled> </option>
                        <option className="text-center font-content" value="student">Student</option>
                        <option className="text-center font-content" value="teacher">Teacher</option>
                        <option className="text-center font-content" value="admin">Admin</option>
                    </select> */}
                    {
                        error && <div className="mt-4 flex items-center p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">{errMes}</span>
                            </div>
                        </div>
                    }
                </form>
                  <div className='w-[70%] gap-10 flex justify-between self-center mt-10
                    lg:w-[50%]'>
                            <button type="button" onClick={() => router.push('/login')} className='cursor-pointer w-auto max-h-10 py-2 px-4 bg-[#EEEEEE] rounded-full text-sm text-black/70 font-bold 
                            md:text-lg
                            hover:bg-gray-400 hover:text-white' >
                                ย้อนกลับ</button>
                            <button type="submit" onClick={handleSubmit} className='cursor-pointer w-auto max-h-10 py-2 px-4 bg-[#F9CB43] rounded-full text-sm text-black/70 font-bold 
                            md:text-lg
                            hover:bg-amber-400 hover:text-white'>
                                ลงทะเบียน</button>
                    </div>
            </div>
        </div>

    )
}

export default Register