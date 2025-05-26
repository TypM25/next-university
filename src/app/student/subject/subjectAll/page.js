"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Table from '@/components/all/table';
import Filter from '@/components/all/filter';
import { common } from '@mui/material/colors';



export default function SubjectAll() {
    const [student, setStudent] = useState("")
    const [user, setUser] = useState("")
    const [subject, setSubject] = useState([])


    const [error, setError] = useState(false)
    const [errMes, setErrMes] = useState("")
    const [term, setTerm] = useState({})

    const router = useRouter();

    async function checksemester() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/check/semester`)
            if (response.data.isOpen === true) {
                setTerm(response?.data.data)
                console.log("Term data:", response.data.data)
            }
            else {
                console.log(response.data.message)
            }
        } catch (error) {
            setErrMes(error.response?.data?.message)
        }
    }

    async function checksAlreayAns(idTeacher, idStudent, idTerm) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student/check/evaluationDetail`, {
                student_id: idStudent,
                teacher_id: idTeacher,
                term_id: idTerm
            })
            return false

        } catch (error) {
            if (error.response?.status === 409) {
                return true;
            }
            console.error("Error:", error);
            setErrMes(error.response?.data?.message || "เกิดข้อผิดพลาด")
            return false;
        }
    }


    useEffect(() => {
        const token = AuthService.getToken();
        const decoded = jwtDecode(token);
        setUser(decoded);

    }, []);



    useEffect(() => {
        if (user && user.username) {
            setError(false)
            async function fetchData() {
                console.log("username => ", user.username)
                const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`;
                try {
                    const response = await axios.get(API_URL);
                    setStudent(response.data.data);
                    setSubject(response.data.data.subjects)
                    // setTeacher(response.data.data.subjects.flatMap((s) => s.teachers))
                    setError(false)
                    setErrMes("")

                } catch (error) {
                    setError(true)
                    setErrMes(error.response?.data?.message)
                }
            }
            fetchData();
            checksemester();

        }
    }, [user])

    console.log("+++++++++++++++++++++++++++++++++++")
    console.log("student ==== ", student)

    return (
        <div className='flex flex-col w-screen px-10 py-20 justify-center items-center'>
            <h1 className='mb-10 text-3xl font-bold text-black'>รายวิชาที่ลงทะเบียน</h1>
            <div className='w-full flex flex-col justify-center items-center'>
                {/* <Filter filter={dropdown} handleDropdown={handleDropdown} handleChange={handleChange} /> */}
                <div className='flex flex-col justify-center items-center w-[100%] min-w-[20px] overflow-x-auto overflow-y-auto'>
                    <table className="w-fit text-sm text-left text-gray-700">
                        <thead className="uppercase bg-[#8E1616] text-white text-center">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-xl font-bold">รหัสรายวิชา</th>
                                <th scope="col" className="px-6 py-4 text-xl font-bold">ชื่อวิชา</th>
                                <th scope="col" className="px-6 py-4 text-xl font-bold">ประเมิน</th>

                            </tr>
                        </thead>
                        <tbody>
                            {subject?.length > 0 ? subject.map((sub, index) => (
                                <tr key={index} className={`border-b border-b-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900 md:text-xl">
                                        {sub.subject_id}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-black/80 md:text-xl">
                                        {sub.subject_name}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900 md:text-xl">
                                        {
                                            sub.teachers.length !== 0 ? sub.teachers?.map((t, index) => {
                                                return <button key={index} onClick={async () => {
                                                    const alreadyAns = await checksAlreayAns(t.teacher_id, student.student_id, term.term_id)
                                                    if (alreadyAns) {
                                                        alert("คุณประเมินอาจารย์ท่านนี้เเล้ว")
                                                        return
                                                    }

                                                    router.push(`/student/evaluation?student_id=${student.student_id}&teacher_id=${t.teacher_id}&term_id=${term.term_id}`)
                                                }}
                                                    className='flex hover:cursor-pointer font-light '>
                                                    <p className='text-sm md:text-xl '>{t.teacher_first_name + " " + t.teacher_last_name}</p>
                                                </button>
                                            })
                                                :
                                                <p className='text-sm md:text-xl'>-</p>
                                        }

                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-6 text-center text-lg text-gray-400 bg-gray-100">
                                        ไม่มีข้อมูลรายวิชา
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    )
}
