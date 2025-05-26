"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';

export default function AddSubject() {
    const [user, setUser] = useState("")
    const [idSubject, setIdsubject] = useState(0)
    const [idTeacher, setIdTeacher] = useState(0)

    const [data, setData] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [newSubjectName, setNewSubjectName] = useState("")

    const [error, setError] = useState(false);
    const [errMes, setErrMes] = useState("")

    const send_data =
    {
        teacher_id: idTeacher,
        subject_id: idSubject
    }


    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/subject/${idSubject}`;
    const API_URL_FIND = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/byuser/${user.user_id}`;
    const API_URL_ADD = `${process.env.NEXT_PUBLIC_API_URL}/teacher/add/subject/${idTeacher}/${idSubject}`;
    const API_URL_CHECK = `${process.env.NEXT_PUBLIC_API_URL}/teacher/check/subject/${idTeacher}/${idSubject}`;
    const API_URL_REMOV = `${process.env.NEXT_PUBLIC_API_URL}/teacher/remove/subject/${idTeacher}/${idSubject}`;
    // const API_URL_UPD = `${process.env.NEXT_PUBLIC_API_URL}/teacher/update/subject/${idSubject}`;


    function handleChange(e) {
        const id = e.target.id
        if (id === 'id') {
            setIdsubject(e.target.value)
        } else if (id === 'newSub') {
            setNewSubjectName(e.target.value)
        }
    }


    async function clickAdd(e) {
        e.preventDefault();
        console.log(data)
        if (!idSubject) {
            setError(true)
            setErrMes("กรุณากรอกชื่อรายวิชาใหม่")
            return;
        }

        try {
            // const Link = API_URL_ADD 
            const res_check = await axios.post(API_URL_CHECK)
            if (!res_check.status === 200) {
                return alert(response.data.message)
            }

            const response = await axios.post(API_URL_ADD)
            setError(false)
            alert(response.data.message)

        } catch (err) {
            setError(true)
            setErrMes(err.response.data?.message)
        }
    }

    async function clickRemove() {
        if (idSubject === '') {
            setError(true)
            setErrMes("กรุณากรอกรหัสรายวิชาเพื่อลบ")
            return;
        }
        try {
            await axios.post(API_URL_CHECK)
            //ยังไม่ลงทะเบียน
            setErrMes("คุณยังไม่ได้ลงทะเบียนวิชานี้")

        } catch (err) {
            if (err.response?.status === 409) {
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

    useEffect(() => {
        const token = AuthService.getToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);

        }
    }, []);

    useEffect(() => {
        async function clickFind() {

            if (!idSubject) return
            if (idSubject === '') {
                setError(true)
                setErrMes("กรุณากรอกรหัสนิสิต")
                return;
            }
            try {
                const res_sub = await axios.get(API_URL)
                const res_teacher = await axios.get(API_URL_FIND)


                setData(res_sub.data.data)
                setIdTeacher(res_teacher.data.data.teacher_id)
                setError(false)
                setErrMes("")
            } catch (error) {
                setError(true)
                setErrMes(error.response?.data?.message)
            }
        }
        clickFind()
        if (!idSubject) return;
    }, [idSubject])

    return (
        <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl md:w-[50%]'>
            <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>ลงทะเบียนสอนรายวิชา</p>

            <div className='w-full flex flex-col items-center'>
                <div className='h-auto w-full flex flex-col gap-5 justify-center items-center  md:items-start md:flex-row md:gap-10'>
                    <p className='self-center text-lg font-semibold text-black/70'>รหัสวิชา :</p>
                    <div>
                        <input
                            id='id'
                            onChange={handleChange}
                            className='px-4 w-full h-9 border-b rounded-none'
                        />
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

                {(editMode || createMode) && (
                    <div className='flex flex-col p-5 w-[80%] bg-gray-100 rounded-lg lg:p-10'>
                        <p className='mb-5 self-start font-semibold'>
                            {editMode ? 'แก้ไขข้อมูลรายวิชา' : 'เพิ่มรายวิชา'}
                        </p>
                        <p className='self-start mt-5'>ชื่อรายวิชาใหม่</p>
                        <input
                            id='newSub'
                            onChange={handleChange}
                            className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light'
                            type='text'
                        />
                        <button
                            onClick={clickAdd}
                            className='self-center w-20 py-2 mx-3 font-bold text-black/70 rounded-full bg-gray-400 hover:bg-gray-500'
                        >
                            ยืนยัน
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}
