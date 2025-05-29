"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';



export default function SubjectAll() {
    const [idStudent, setIdStudent] = useState("")
    const [idTerm, setIdTerm] = useState("")
    const [user, setUser] = useState("")
    const [subject, setSubject] = useState([])

    const router = useRouter();

    //เก็บข้อมูลuser ส่งuser.user_idไปfetchData
    useEffect(() => {
        const token = AuthService.getToken();
        const decoded = jwtDecode(token);
        setUser(decoded);

    }, []);

    //ดูเทอมการศึกษาที่เปิดอยู่ เก็บค่าterm_idเพื่อไปยัง checksAlreayAns()
    async function checksemester() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/check/semester`)
            if (response.data.isOpen === true) {
                setIdTerm(response?.data.data.term_id)
                console.log("idTerm data:", response.data.data)
            }
            else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    //เข็คว่านิสิตได้ประเมินอาจารย์เทอมการศึกษานี้ยัง
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
            console.error("Error:", error.response?.data?.message);
            return false;
        }
    }

    //ค้นหาข้อมูลนิสิต เเสดงรายวิชาที่นิสิตลงทะบียน+เก็บค่าstudent_idเพื่อส่งtermid
    async function fetchData() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`);
            setIdStudent(response.data.data.student_id);
            setSubject(response.data.data.subjects)
            // setTeacher(response.data.data.subjects.flatMap((s) => s.teachers))
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => {
        if (user && user.username) {
            fetchData();
            checksemester();
        }
    }, [user])

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
                                                    const alreadyAns = await checksAlreayAns(t.teacher_id, idStudent, idTerm)
                                                    if (alreadyAns) {
                                                        alert("คุณประเมินอาจารย์ท่านนี้เเล้ว")
                                                        return
                                                    }

                                                    router.push(`/student/evaluation?student_id=${idStudent}&teacher_id=${t.teacher_id}&term_id=${idTerm}`)
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
                                        ไม่มีข้อมูล
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
