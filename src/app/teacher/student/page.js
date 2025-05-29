"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import TableStudSub from '@/components/teacher/TableStudSub'
import axios from 'axios'
import LoadingMui from '@/components/loadingMui'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SubjectStudent() {
    const searchParams = useSearchParams();
    const subject_id = searchParams.get('subject_id');

    const [students, setStudents] = useState([])
    //ค้นหารายวิชาด้วยsubject_id
    async function fetchData() {
        try {
            const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/subject/${subject_id}`;
            const response = await axios.get(API_URL)
            setStudents(response.data.data.students)
            console.log("student_subject : ", response.data.data.students)
        }
        catch (err) {
            console.log(err.response.data.message)
        }
    }

    useEffect(() => {
        if(subject_id)
        fetchData()
    }, [subject_id])

    // console.log("students : ",students)

    return (
        <div>
            {
                Array.isArray(students) && students.length > 0 ? (
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Student ID</TableCell>
                                    <TableCell align="center">First Name</TableCell>
                                    <TableCell align="center">Last Name</TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell align="center">{row.student_id}</TableCell>
                                        <TableCell align="center">{row.student_first_name}</TableCell>
                                        <TableCell align="center">{row.student_last_name}</TableCell>
                                        <TableCell align="center">
                                            {row?.gradeDetails && row.gradeDetails.length > 0 ?
                                                row.gradeDetails[0].grade
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <LoadingMui />
                )
            }
        </div>
    )
}
