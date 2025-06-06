"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import LoadingMui from '@/components/loadingMui'
import { Button } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GradeComponent() {
  const searchParams = useSearchParams();
  const subject_id = searchParams.get('subject_id');
  const term_id = searchParams.get('term_id');

  const [students, setStudents] = useState([])
  const [credits, setCredits] = useState("")
  const [answer, setAnswer] = useState([])

  const handleAnswerChange = (student_id, score) => {
    setAnswer((prevAnswers) => {
      //ฟิลเตอร์ลบข้อมูล"เดิม"ของนิสิตที่จะ"แก้ไข"ออก
      //ป้องกันการแก้ไข2รอบ
      const update_data = prevAnswers.filter(ans => ans.student_id !== student_id);
      return [
        ...update_data,
        {
          //ใส่คำตอบของนิสิตคนนั้นใหม่
          student_id: Number(student_id),
          subject_id: Number(subject_id),
          term_id: Number(term_id),
          score: Number(score),
          credits: Number(credits)
        }
      ];
    });
  };

   //หานิสิตที่เรียนวิชานี้
  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teacher/find/subject/${subject_id}`)
      setStudents(response?.data?.data?.students)
      setCredits(response?.data?.data?.credits)

    }
    catch (err) {
      console.log(err.response.data.message)
    }
  }

    //สร้างเกรดได้แบบนิสิตหลายคน Array objects
  async function handleSubmit() {
    if (term_id !== undefined) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher/create/multi/gradeDetail`, answer)
        setAnswer([])
        alert(response.data.message)
      }
      catch (error) {
        alert(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full h-[50%] px-4 flex flex-col justify-center items-center lg:w-fit '>
      <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>แก้ไขเกรด</p>
      {
        Array.isArray(students) && students.length > 0 ? (
          <>
              <div className='w-[90%] h-auto overflow-y-auto max-h-[400px]
                    lg:w-auto lg:w-[80%] lg:scale-[100%] lg:flex lg:justify-center'>
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
                  <TableBody >
                    {students?.map((row, rowIndex) =>
                      <TableRow key={rowIndex}>
                        <TableCell align="center">{row.student_id}</TableCell>
                        <TableCell align="center">{row.student_first_name}</TableCell>
                        <TableCell align="center">{row.student_last_name}</TableCell>
                        <TableCell align="center">
                          <input type="number" min={0} max={100} onChange={(e) => handleAnswerChange(row.student_id, e.target.value)}
                            className="w-10 text-center border-b"
                            defaultValue={row?.gradeDetails && row.gradeDetails.length > 0 ? row.gradeDetails[0].score : null}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="w-full flex justify-center mt-10">
              <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
                update
              </Button>
            </div>
          </>


        ) : (
          <LoadingMui />
        )
      }
    </div>
  )
}
