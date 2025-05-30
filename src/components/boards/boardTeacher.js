"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import UploadImage from "../uploadImage";

const BoardTeacher = () => {
    const [teacher, setTeacher] = useState("")
    const [user, setUser] = useState("")

    //URL สำหรับส่งไป UPLOAD COMPONENT
    const API_URL_IMAGE = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/files`;
    const API_URL_UPLOAD = `${process.env.NEXT_PUBLIC_API_URL}/teacher/upload`;

    useEffect(() => {
        const token = AuthService.getToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }

    }, []);


    useEffect(() => {
        if (user && user.username) {
            async function fetchData() {
                console.log("username", user.username)
                const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/byuser/${user.user_id}`;
                try {
                    const response = await axios.get(API_URL);
                    setTeacher(response.data.data);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        // ถ้ายังไม่ลงทะเบียนก็ไม่ต้องตั้งค่า teacher
                        console.log("ยังไม่ได้ลงทะเบียนเป็นอาจารย์");
                        setTeacher(null);
                    } else {
                        console.error("Error fetching teacher:", error);
                    }
                }
            }

            fetchData();
        }
    }, [user])

    return (
        <div name='teacher' className='w-auto h-100% flex flex-col items-center m-20 text-start'>
            <div className='w-full h-full text-center'>
                <p className='text-4xl font-semibold mb-[10%] text-[#A31D1D]'>อาจารย์</p>
                <div className='flex flex-col justify-center w-auto h-auto'>
                    <UploadImage API_URL_IMAGE={API_URL_IMAGE} API_URL_UPLOAD={API_URL_UPLOAD} />
                    <div className='text-start w-fit '>
                        <p className='text-2xl m-4 text-[#1D1616]'> รหัสอาจารย์ : {teacher?.teacher_id}</p>
                        <p className='text-2xl m-4 text-[#1D1616]'> ชื่อ : {teacher?.teacher_first_name}</p>
                        <p className='text-2xl m-4 text-[#1D1616]'> นามสกุล : {teacher?.teacher_last_name}</p>
                        <p className='text-2xl m-4 text-[#1D1616]'> วิชาที่สอน : {teacher?.subject_id}</p>
                        <p className='text-2xl m-4 text-[#1D1616]'> เรตติ้ง : {teacher?.teacherRating?.rating_score}</p>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default BoardTeacher;