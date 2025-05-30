"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthService from '@/services/auth.service'
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    //roleที่เลือก
    const [role, setRole] = useState(null)
    //rolesจากการfetch
    const [roles, setRoles] = useState([])

    //Error message box
    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState("")
    //ปิดการพิมพ์MUI
    const [inputValue, setInputValue] = useState('');

    const router = useRouter();

    function handleSelectRoles(event, data) {
        setRole(data ? data.value : null);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            //เรียกฟังก์ชันลงทะเบียน
            const response = await AuthService.register(username, password, confirmPassword, role);
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

    async function fetchRoles() {
        try {
            //เก็บroles
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/all/roles`)
            setRoles(response.data.data.map((r) => ({ name: r.name.toUpperCase(), value: r.name })))
        }
        catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    console.log(roles)

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#FEF9E1] ">
            <div className=' relative h-[80%] w-[80%] flex flex-col justify-center items-center rounded-[50px] bg-[#A31D1D] shadow-xl shadow-yellow-500/50
      md:h-[70%] md:w-[70%]
      lg:w-[30%] lg:h-[70%]
           motion-scale-in-[0.5] motion-opacity-in-[0%] motion-duration-[300ms] motion-ease-spring-bouncier'>
                <img src="/img/hat2.png" alt="หมวก" className="absolute w-30 h-30 -top-16 z-7
                    motion-preset-shake motion-duration-900
                    md:w-32 md:h-32" />

                <form className='w-[60%] flex flex-col justify-center items-center
                lg:w-[60%]'>
                    <h1 className='text-2xl text-[#EEEEEE] mb-10 font-bold z-6 whitespace-nowrap
                    md:text-3xl
                    lg:text-5xl lg:mb-15'>
                        ลงทะเบียน
                    </h1>
                    <ul className="w-full flex flex-col gap-6">
                        <li >
                            <p className='self-start text-xl font-semibold text-[#E5D0AC]'>ชื่อผู้ใช้</p>
                            <input id='username' onChange={(e) => setUsername(e.target.value)}
                                className='w-full py-2 px-4 rounded-full bg-gray-200 font-light' type='text' ></input>

                        </li>
                        <li>
                            <p className='self-start text-xl font-semibold text-[#E5D0AC]'>รหัสผ่าน</p>
                            <input id='password' onChange={(e) => setPassword(e.target.value)}
                                className='w-full py-2 px-4 rounded-full bg-gray-200 font-light' type='password' ></input>
                        </li>
                        <li >
                            <p className='self-start text-xl font-semibold text-[#E5D0AC]'>ยืนยันรหัสผ่าน</p>
                            <input id='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full py-2 px-4 rounded-full bg-gray-200 font-light' type='password' ></input>
                        </li>
                        <li >
                            <Autocomplete
                                options={roles}
                                getOptionLabel={(option) => option.name}
                                onChange={handleSelectRoles}
                                value={roles.find((r) => r.value === role) || null}
                                disableClearable
                                freeSolo={false} // ปิดไม่ให้พิมพ์สร้าง option ใหม่
                                inputValue={inputValue}  // ควบคุม inputValue จาก state
                                //ปิดการพิมMUI
                                onInputChange={(event, newInputValue, reason) => {
                                    if (reason === 'input') {
                                        return;
                                    }
                                    setInputValue(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Roles"
                                        //ปิดการพิมพ์
                                        inputProps={{
                                            ...params.inputProps,
                                            readOnly: true,
                                            style: {
                                                caretColor: 'transparent',
                                                userSelect: 'none',
                                            },
                                        }}
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
                    <div className='w-full gap-10 flex justify-center self-center mt-10'>
                        <button type="button" onClick={() => router.push('/login')} className='cursor-pointer w-auto max-h-10 py-2 px-4 bg-[#EEEEEE] rounded-full whitespace-nowrap text-sm text-black/70 font-bold 
                            lg:text-lg
                            hover:bg-gray-400 hover:text-white' >
                            ย้อนกลับ</button>
                        <button type="submit" onClick={handleSubmit} className='cursor-pointer w-auto max-h-10 py-2 px-4 bg-[#F9CB43] rounded-full whitespace-nowrap text-sm text-black/70 font-bold 
                            lg:text-lg
                            hover:bg-amber-400 hover:text-white'>
                            ลงทะเบียน</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default Register