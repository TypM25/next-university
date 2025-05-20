"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserUpdate() {
    const [idUser, setIdUser] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [newPassword, setNewPassword] = useState(null)
    const [cfPassword, setCfPassword] = useState(null)

    const [data, setData] = useState("")
    const [editMode, setEditMode] = useState(false)


    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState("")

    const [errorUpdate, setErrorUpdate] = useState(false)
    const [errMesUpdate, setErrMesUpdate] = useState("")


    const login_data = {
        username: username,
        password: password
    }
    const change_password = {
        username: username,
        password: newPassword
    }
    const find_data = {
        username: username
    }

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/find/user/id`;
    const API_URL_LOGIN = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`;
    const API_URL_DEL = `${process.env.NEXT_PUBLIC_API_URL}/admin/delete/user`;
    const API_URL_UPD = `${process.env.NEXT_PUBLIC_API_URL}/admin/update/user`;

    function handleChange(e) {
        const id = e.target.id
        if (id === 'user_id') {
            setIdUser(e.target.value)
        }
        else if (id === 'password') {
            setPassword(e.target.value)
        }
        else if (id === 'newpassword') {
            setNewPassword(e.target.value)
        }
        else if (id === 'cfpassword') {
            setCfPassword(e.target.value)
            console.log(cfPassword)
        }
    }



    async function clickConfirmEdit(e) {
        e.preventDefault();
        console.log("Edit click")
        console.log("NewPass :", newPassword)
        console.log("CF Pass :", cfPassword)
        try {
            //1.) check login 
            const response1 = await axios.post(API_URL_LOGIN, login_data)
            console.log(response1.data.data)

            //เมือ่ไม่กรอกรหัสผ่าน
            if (!cfPassword || !newPassword) {
                setErrMesUpdate("กรุณากรอกข้อมูล")
                setErrorUpdate(true)
                return;
            }

            if (password === newPassword) {
                setErrMesUpdate("คุณเคยใช้รหัสผ่านนี้เเล้ว")
                setErrorUpdate(true)
                return;
            }

            //2) check passwprd == cfpassword
            if (newPassword != cfPassword) {
                setErrMesUpdate("รหัสผ่านไม่ตรงกับยืนยันรหัสผ่าน")
                setErrorUpdate(true)
                return
            }

            const response2 = await axios.put(API_URL_UPD, change_password)
            setErrorUpdate(false)
            setEditMode(false);
            setCfPassword(null);
            setNewPassword(null);
            alert(response2.data.message)
        }
        catch (err) {
            setErrorUpdate(true)
            setErrMesUpdate(err.response.data.message)
        }
    }

    async function clickDelete() {
        try {
            const response = await axios.delete(API_URL_DEL, { data: find_data })
            setError(false)
            setData('')
            alert(response.data.message)
        }
        catch (err) {
            setError(true)
            alert(err.response.data.message || "เกิดข้อผิดพลาดบางประการ")
        }
    }

    useEffect(() => {
        if (!idUser) return; // ถ้ายังไม่มี id ไม่ต้อง fetch
        async function clickFind() {
            try {
                const response = await axios.post(API_URL, {
                    id: idUser
                })
                setUsername(response.data.data.username)
                setError(false)
                setData(response.data.data)
                console.log(data)
            }
            catch (error) {
                setError(true)
                setErrMes(error.response.data.message)
            }
        }
        clickFind()

    }, [idUser])

    return (
        <div className='w-[70%] h-[50%] px-10 py-20 flex flex-col justify-center items-center rounded-3xl
        lg:w-[50%]'>
            <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>แก้ไขข้อมูลผู้ใช้</p>
            <div className='w-full flex flex-col items-center '>

                <div className='h-auto w-full flex flex-col gap-5 justify-center items-center
                lg:flex-row  lg:items-start lg:gap-10'>
                    <p className='text-lg font-semibold text-balck/70'>
                        ชื่อผู้ใช้ : </p>
                    <div>
                        <input id='user_id' onChange={handleChange} className='px-4 w- h-9 border-b'></input>
                        {
                            error && <div className="flex self-start p-2 my-3 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>

                                <div>
                                    <span className="font-medium">{errMes}</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className=' flex justify-center mt-4'>
                    <button onClick={() => { setEditMode(true); }} className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-yellow-500 hover:bg-yellow-600' >
                        เปลี่ยนรหัสผ่าน</button>
                    <button onClick={clickDelete} className='w-auto px-6 py-2 mx-3 font-bold text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]' >
                        ลบ</button>
                </div>

                <div className='w-full h-full py-10 px-10 lg:px-30'>
                    <div className='flex mb-7'>
                        <p className='text-lg mr-3 text-balck/70'>ชื่อผู้ใช้ : </p>
                        <p className='self-center text-lg text-[#BB3E00]'> {data.username}</p>
                    </div>
                </div>
                {
                    editMode && <div className='flex flex-col p-5 w-[80%] bg-gray-100 rounded-lg
                lg:p-10'>
                        <p className='mb-5 self-start font-semibold'>เปลี่ยนรหัสผ่าน</p>
                        <p className='self-start'>รหัสผ่านเดิม</p>
                        <input id='password' onChange={handleChange} className='w-full p my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='password'></input>
                        <p className='self-start'>รหัสผ่านใหม่</p>
                        <input id='newpassword' onChange={handleChange} className='w-full p my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='password'></input>
                        <p className='self-start '>ยืนยันรหัสผ่านใหม่</p>
                        <input id='cfpassword' onChange={handleChange} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='password'></input>
                        {
                            errorUpdate && <div className="flex self-start p-2 my-3 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">{errMesUpdate}</span>
                                </div>
                            </div>
                        }
                        <button onClick={clickConfirmEdit} className='self-center w-20 py-2 mx-3 font-bold text-balck/70 rounded-full bg-gray-400 hover:bg-gray-500'>
                            ยืนยัน</button>
                    </div>
                }

            </div>
        </div>
    )
}
