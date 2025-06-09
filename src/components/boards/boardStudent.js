"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import UploadImage from "../uploadImage";

const BoardStudent = () => {
    const [student, setStudent] = useState("")
    const [user, setUser] = useState("")
    const [gpa, setGpa] = useState("")

    //URL สำหรับส่งไป UPLOAD COMPONENT
    const API_URL_IMAGE = `${process.env.NEXT_PUBLIC_API_URL}/student/find/files`;
    const API_URL_UPLOAD = `${process.env.NEXT_PUBLIC_API_URL}/student/upload`;

    useEffect(() => {
        const token = AuthService.getToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    async function fetchData() {
        try {
            const stud_data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`);
            const studentId = stud_data.data.data.student_id;

            setStudent(stud_data.data.data);

            const gpa_data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/gpa/${studentId}`);
            setGpa(gpa_data.data.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // ถ้ายังไม่ลงทะเบียนก็ไม่ต้องตั้งค่า teacher
                console.log("ยังไม่ได้ลงทะเบียนนิสิต");
                setStudent(null);
            } else {
                console.error("Error fetching teacher:", error);
            }
        }
    }

    useEffect(() => {
        if (user && user.user_id) {
            fetchData();
        }
    }, [user])

    return (
        <>
            <div name='student' className='w-full h-full flex flex-col items-center text-start '>
                <div className='w-full h-full flex flex-col justify-center items-center text-center'>
                    <p className='text-4xl font-bold mb-7'>นิสิต</p>
                    <div>
                        <UploadImage API_URL_IMAGE={API_URL_IMAGE} API_URL_UPLOAD={API_URL_UPLOAD} />
                    </div>
                    <div className="w-full">
                        <div className='flex flex-col justify-center h-auto'>
                            <div className='text-start w-fit '>
                                <p className='text-2xl m-4'> รหัสนิสิต : {student?.student_id}</p>
                                <p className='text-2xl m-4'> ชื่อ : {student?.student_first_name}</p>
                                <p className='text-2xl m-4'> นามสกุล : {student?.student_last_name}</p>
                            </div>
                        </div>
                        <div className='w-full h-auto overflow-y-auto max-h-[400px]
                    lg:flex lg:justify-center lg:w-full'>
                            {gpa !== null &&
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-white uppercase bg-[#8E1616] text-center">
                                        <tr>
                                            <th scope="col" className="text-sm p-1 lg:px-6 lg:py-3 lg:text-lg">Term ID</th>
                                            <th scope="col" className="text-sm p-1 lg:px-6 lg:py-3 lg:text-lg">GPA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-300">
                                            <td className="p-1 font-medium text-gray-900 whit espace-nowrap bg-white text-center 
                                                lg:text-xl">
                                                {gpa.term_id}
                                            </td>
                                            <td className="p-1 text-center text-sm bg-gray-50 
                                        lg:px-6 lg:py-4 lg:text-xl ">
                                                {gpa.GPA}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>}
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
};

export default BoardStudent;