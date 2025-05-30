"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StudentFind() {
    const [idStudent, setIdStudent] = useState("")
    const [studentData, setStudentData] = useState("")
    const [subject, setSubject] = useState([])

    //Error message box
    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState("")


     //ค้นหาข้อมูลนิสิตด้วย idStudent
    async function findStudent() {
        try {
            const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/find/student/${idStudent}`;
            const response = await axios.get(API_URL)
            setStudentData(response.data.data)
            setError(false)
            setErrMes('')
            //เก็บรายวิชา
            setSubject(response.data.data.subjects.map((sub) => sub))

        }
        catch (error) {
            setError(true)
            setErrMes(error.response?.data?.message)
        }
    }

    useEffect(() => {
        if (idStudent === '') {
            setError(true)
            setErrMes("กรุณากรอกรหัสนิสิต")
            return;
        }
        findStudent();
    }, [idStudent])

    return (
        <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl
        lg:w-[50%] lg:px-10'>
            <p className='text-3xl font-bold mb-10 text-[#8E1616]'>ค้นหาข้อมูลนิสิต</p>
            <div className='h-auto w-full flex flex-col gap-5 justify-center items-center text-center
                lg:flex-row lg:gap-10'>
                <p className='self-center text-xl font-semibold text-black'> รหัสนิสิต :</p>
                <div>
                    <input id='id' onChange={(e)=>setIdStudent(e.target.value)} className='px-4 py-2 w-full min-w-50 h-full border-b'></input>

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
                {/* <button 
                    onClick={findStudent} className='w-20 py-2 h-full mx-3 font-bold text-[#8E1616] rounded-full bg-gray-500 hover:bg-gray-700'>
                        ค้นหา</button> */}
            </div>
            <div className='w-fit h-full mt-10 '>
                <div className='flex mb-7'>
                    <p className='text-xl mr-3 text-black/70 '>ชื่อ : </p>
                    <p className='self-center text-xl text-[#BB3E00]'> {studentData.student_first_name}</p>
                </div>
                <div className='flex mb-7'>
                    <p className='text-xl mr-3 text-black/70'>นามสกุล : </p>
                    <p className='self-center text-xl text-[#BB3E00]'> {studentData.student_last_name}</p>
                </div>
                <div className='flex flex-col mb-7 '>
                    <p className='text-xl text-xl mb-10 text-black/70'>วิชาที่ลงเรียน : </p>

                    <table className='block'>
                        <thead className=" text-xs text-white bg-[#8E1616]">
                            <tr>
                                <th scope="col" className="text-lg p-1 lg:px-6 lg:py-3">รหัสรายวิชา</th>
                                <th scope="col" className="text-lg p-1 lg:px-6 lg:py-3">ชื่อวิชา</th>
                                <th scope="col" className="text-lg p-1 lg:px-6 lg:py-3">สอนโดย</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subject.length > 0 ? subject.map((subject, index) => (
                                <tr key={index} className="border-b border-gray-200 dark:border-gray-300">
                                    <td className="p-1 lg:px-6 lg:py-4 font-medium text-gray-900 whitespace-nowrap bg-white text-center text-xl">
                                        {subject.subject_id}
                                    </td>
                                    <td className="p-1 lg:px-6 lg:py-4 text-center text-xl bg-gray-200">
                                        {subject.subject_name}
                                    </td>
                                    <td className="p-1 lg:px-6 lg:py-4 bg-gray-50 bg-white text-center text-xl ">
                                        {Array.isArray(subject.teachers) && subject.teachers.length > 0 ? subject.teachers.map((tech) => tech.teacher_first_name + " " + tech.teacher_last_name)
                                            : "-"}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="p-1 lg:px-6 lg:py-4 text-center text-xl text-gray-400 bg-white">
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}
