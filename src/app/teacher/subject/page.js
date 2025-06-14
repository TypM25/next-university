"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

export default function AddSubject() {
    const [user, setUser] = useState("")
    const [idSubject, setIdSubject] = useState("")
    const [idTeacher, setIdTeacher] = useState("")

    const [data, setData] = useState("")

    //Error message box
    const [error, setError] = useState(false);
    const [errMes, setErrMes] = useState("")

    useEffect(() => {
        const token = AuthService.getToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    //ลงทะเบียนสอนรายวิชา
    async function clickAdd(e) {
        e.preventDefault();

        // console.log("id sub : ", idSubject)
        try {
            const API_URL_CHECK = `${process.env.NEXT_PUBLIC_API_URL}/teacher/check/subject/${idTeacher}/${idSubject}`;
            const res_check = await axios.post(API_URL_CHECK)
            if (!res_check.data.status_code === 200) {
                return alert(response.data.message)

            }
            const API_URL_ADD = `${process.env.NEXT_PUBLIC_API_URL}/teacher/add/subject`;
            const response = await axios.post(API_URL_ADD, { teacher_id: idTeacher, subject_id: idSubject })
            if (!response.data.status_code === 200) {
                return alert(response.data.message)
            }
            setError(false)
            alert(response.data.message)

        } catch (err) {
            setError(true)
            setErrMes(err.response.data?.message)
        }

    }

    //ถอนรายวิชา
    async function clickRemove() {
        try {
            const API_URL_CHECK = `${process.env.NEXT_PUBLIC_API_URL}/teacher/check/subject/${idTeacher}/${idSubject}`;
            await axios.post(API_URL_CHECK)
            //ยังไม่ลงทะเบียน
             setError(true)
            setErrMes("คุณยังไม่ได้ลงทะเบียนวิชานี้")

        } catch (err) {
            if (!idSubject || !idTeacher) {
                setError(true)
                setErrMes(err.response?.data?.message)
                return
            }
            if (err.response?.status === 409) {
                const API_URL_REMOV = `${process.env.NEXT_PUBLIC_API_URL}/teacher/remove/subject/${idTeacher}/${idSubject}`;
                const response = await axios.delete(API_URL_REMOV)
                setData('')
                setError(false)
                alert(response.data.message)
                return
            }

            setError(true)
            setErrMes(err.response?.data?.message)
        }
    }

    async function fetchIdTeacher() {
        try {
            const API_URL_FIND = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/byuser/${user.user_id}`;
            const response = await axios.get(API_URL_FIND)
            console.log(response.data.data.teacher_id)
            setIdTeacher(response.data.data.teacher_id)
            setError(false)
            setErrMes("")
        }
        catch (err) {
            setError(true)
            setErrMes(error.response?.data?.message)
        }
    }

    //ค้นหาข้อมูลรายวิชา
    async function findData() {
        try {
            const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/subject/${idSubject}`;
            const response = await axios.get(API_URL)
            setData(response.data.data)
            setError(false)
            setErrMes("")
        } catch (error) {
            setError(true)
            setErrMes(error.response?.data?.message)
        }
    }

    useEffect(() => {
        if (user)
            fetchIdTeacher()
    }, [user])

    useEffect(() => {
        if (!idSubject || isNaN(idSubject)) {
            setError(true)
            setErrMes("กรุณากรอกรหัสวิชา")
            return;
        };
        findData()
    }, [idSubject])

    return (
        <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl lg:w-[50%]'>
            <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>ลงทะเบียนสอนรายวิชา</p>

            <div className='w-full flex flex-col items-center'>
                <div className='h-auto w-full flex flex-col gap-5 justify-center items-center  lg:items-start lg:flex-row lg:gap-10'>
                    <p className='self-center text-lg font-semibold text-black/70'>รหัสวิชา :</p>
                    <div>
                        <input
                            id='id'
                            onChange={(e) => setIdSubject(e.target.value)}
                            className='px-4 w-full h-9 border-b rounded-none'
                        />

                        {/*ERROR BOX MUI */}
                        {error && (
                            <div
                                className='flex self-start p-2 my-3 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
                                role='alert'
                            >
                                <svg
                                    className='shrink-0 inline w-4 h-4 me-3'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                                </svg>

                                <div>
                                    <span className='font-medium'>{errMes}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex justify-center mt-7'>
                    <button
                        id='edit'
                        onClick={clickAdd}
                        className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-yellow-500 hover:bg-yellow-600'
                    >
                        เพิ่ม
                    </button>
                    <button
                        onClick={clickRemove}
                        className='w-auto px-6 py-2 mx-3 font-bold text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]'
                    >
                        ลบ
                    </button>
                </div>

                <div className='w-full h-full py-10 px-10 lg:px-30'>
                    <div className='flex mb-7'>
                        <p className='text-lg mr-3 text-black/70'>ชื่อวิชา : </p>
                        <p className='self-center text-lg text-[#BB3E00]'>{data.subject_name}</p>
                    </div>
                </div>

            </div>
        </div>

    )
}
