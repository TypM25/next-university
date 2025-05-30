"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StudentUpdate() {
    const [idStudent, setIdstudent] = useState(null)
    const [data, setData] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    //Error message box
    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState('')
    //เก็บ update_data ไว้ post
    const update_data = {
        student_id: idStudent,
        student_first_name: firstname,
        student_last_name: lastname
    }

    //แก้ไขข้อมูลนิสิต
    async function clickConfirmEdit(e) {
        e.preventDefault();
        try {
            const API_URL_UPD = `${process.env.NEXT_PUBLIC_API_URL}/admin/update/student`;
            const response = await axios.put(API_URL_UPD, update_data)
            setError(false)
            setErrMes("")
            setFirstname("")
            setLastname("")

            alert(response.data.message)
        }
        catch (err) {
            setError(true)
            setErrMes(err.response.data.message)
        }
    }

    //ลบข้อมูลนิสิต
    async function clickDelete() {
        try {
            const API_URL_DEL = `${process.env.NEXT_PUBLIC_API_URL}/admin/delete/student/${idStudent}`;
            const response = await axios.delete(API_URL_DEL)
            setData('')
            setError(false)
            setErrMes('')
            alert(response.data.message)
        }
        catch (err) {
            setError(true)
            setErrMes(err.response?.data?.message)
            alert(err.response?.data?.message)
        }
    }

    //ค้นหาข้อมูลส่วนตัวนิสิต
    async function findStudent() {
        try {
            const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/find/student/${idStudent}`;
            const response = await axios.get(API_URL)
            setData(response.data.data)
            setError(false)
            setErrMes('')

        }
        catch (error) {
            setError(true)
            setErrMes(error.response?.data?.message)
            // alert(error.response?.data?.message )
        }
    }
    useEffect(() => {
        if (!idStudent) {
            setError(false)
            setErrMes('')
            return;
        }
        findStudent()
    }, [idStudent])

    return (
        <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl 
        lg:w-[50%]'>
            <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>แก้ไขข้อมูลนิสิต</p>
            <div className='w-full flex flex-col items-center'>
                <div className='h-auto w-full flex flex-col gap-5 justify-center items-center 
                lg:flex-row lg:gap-10'>
                    <p className='self-center text-lg font-semibold text-black/70'>รหัสนิสิต :</p>
                    <div >
                        <input id='id' onChange={(e) => setIdstudent(e.target.value)} className='px-4 w-full h-9  border-b' />
                        {/*ERROR BOX MUI */}
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

                    {/* <button onClick={findStudent} className='w-20 py-2 h-full mx-3 font-bold text-black/70 rounded-full bg-gray-500 hover:bg-gray-600'>
                        ค้นหา
                    </button> */}
                </div>

                <div className='flex justify-center mt-7'>
                    <button onClick={() => setEditMode(true)} className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-yellow-500 hover:bg-yellow-600'>แก้ไข</button>
                    <button onClick={clickDelete} className='w-auto px-6 py-2 mx-3 font-bold text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]'>ลบ</button>
                </div>

                <div className='w-full h-full py-10 px-10 lg:px-30'>
                    <div className='flex mb-7'>
                        <p className='text-lg mr-3 text-black/70'>ชื่อ : </p>
                        <p className='self-center text-lg text-[#BB3E00]'>{data.student_first_name}</p>
                    </div>
                    <div className='flex mb-7'>
                        <p className='text-lg mr-3 text-black/70'>นามสกุล : </p>
                        <p className='self-center text-lg text-[#BB3E00]'>{data.student_last_name}</p>
                    </div>
                </div>

                {editMode &&
                    <div className='flex flex-col p-5 w-[80%] bg-gray-100 rounded-lg lg:p-10'>
                        <p className='mb-5 self-start font-semibold'>แก้ไขข้อมูลนิสิต</p>
                        <p className='self-start'>
                            ชื่อ</p>
                        <input id='firstname' onChange={(e) => setFirstname(e.target.value)}
                            className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text' />
                        <p className='self-start'>
                            นามสกุล</p>
                        <input id='lastname' onChange={(e) => setLastname(e.target.value)}
                            className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text' />
                        <button onClick={clickConfirmEdit} className='self-center w-20 py-2 mx-3 font-bold text-black/70 rounded-full bg-gray-400 hover:bg-gray-500'>ยืนยัน</button>
                    </div>}
            </div>
        </div>
    )
}
