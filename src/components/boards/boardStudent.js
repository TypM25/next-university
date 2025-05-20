"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import UploadImage from "../uploadImage";
import ChatPage from "../chat/chatpage";

import LoadingMui from '@/components/loadingMui'
import { Button } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const BoardStudent = () => {
    const [idStudent, setIdStudent] = useState("")
    const [student, setStudent] = useState("")
    const [user, setUser] = useState("")
    const [gpa, setGpa] = useState("")


    const API_URL_IMAGE = `${process.env.NEXT_PUBLIC_API_URL}/student/find/files`;
    const API_URL_UPLOAD = `${process.env.NEXT_PUBLIC_API_URL}/student/upload`;


    useEffect(() => {
        const token = AuthService.getToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }

    }, []);

    console.log(student)
    useEffect(() => {
        if (user && user.username) {
            async function fetchData() {
                console.log("username", user.username)
                try {
                    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`;
                    const stud_data = await axios.get(apiUrl);

                    const studentId = stud_data.data.data.student_id;
                    setIdStudent(studentId);
                    setStudent(stud_data.data.data);

                    const gpaUrl = `${process.env.NEXT_PUBLIC_API_URL}/student/gpa/${studentId}`;
                    const gpa_data = await axios.get(gpaUrl);
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

            fetchData();
        }
    }, [user])
    return (
        <>
            <div name='student' className='w-auto h-100% flex flex-col items-center m-20 text-start'>
                <div className='w-full h-full flex flex-col justify-center items-center text-center'>
                    <p className='text-4xl font-bold mb-7'>นิสิต</p>
                    <div>
                        <UploadImage API_URL_IMAGE={API_URL_IMAGE} API_URL_UPLOAD={API_URL_UPLOAD} />
                    </div>
                    <div className="">
                        <div className='flex flex-col justify-center h-auto'>
                            <div className='text-start w-fit '>
                                <p className='text-2xl m-4'> รหัสนิสิต : {student?.student_id}</p>
                                <p className='text-2xl m-4'> ชื่อ : {student?.student_first_name}</p>
                                <p className='text-2xl m-4'> นามสกุล : {student?.student_last_name}</p>
                            </div>
                        </div>
                        <div className="max-w-180">
                            <TableContainer component={Paper} >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Term ID</TableCell>
                                            <TableCell align="center">GPAX</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >

                                        <TableRow >
                                            <TableCell align="center">{gpa?.term_id}</TableCell>
                                            <TableCell align="center">{gpa?.GPA}</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
    

        </>

    )
};

export default BoardStudent;