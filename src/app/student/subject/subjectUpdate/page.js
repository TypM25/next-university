"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';

export default function SubjectUpdate() {
  const [user, setUser] = useState("")

  const [idSubject, setIdsubject] = useState("")
  const [idStudent, setIdStudent] = useState("")
  const [subject, setSubject] = useState("")

  //Error message box
  const [error, setError] = useState(false)
  const [errMes, setErrMes] = useState("")

  //เก็บข้อมูลuser
  useEffect(() => {
    const token = AuthService.getToken();
    const decoded = jwtDecode(token);
    setUser(decoded);
  }, []);


  //เก็บข้อมูลนิสิตเพื่อเอาstudent_id เพื่อส่งparams
  async function fetchData() {
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`;
      const response = await axios.get(API_URL);
      setIdStudent(response.data.data.student_id);
      setError(false)
    }
    catch (error) {
      setError(true)
      setErrMes(error.response?.data?.message || error.message);
    }
  }

  //ค้นหาวิชาด้วยsubject_id
  async function fetchSubject() {
    try {
      const API_URL_SUB = `${process.env.NEXT_PUBLIC_API_URL}/student/find/subject/${idSubject}`;
      const response = await axios.get(API_URL_SUB);
      if (response && response.data) {
        setSubject(response.data.data);
        setError(false)
      } else {
        setErrMes("Error: Subject not found");
        setIdsubject(0);

      }
    }
    catch (error) {
      setError(true)
      setErrMes(error.response?.data?.message || error.message);
    }
  }

  //เช็คว่าเคยลงทะเบียนวิชานี้ยัง
  async function checkIsReg() {
    try {
      const API_URL_CHECK_SUB = `${process.env.NEXT_PUBLIC_API_URL}/student/studentSubject/${idStudent}/${idSubject}`;
      const response = await axios.get(API_URL_CHECK_SUB)
      const data_sub = response.data.data
      //ไม่มีวิชเรียน
      if (!data_sub) {
        setError(false)
        setErrMes("")
        return false
      }
    }
    catch (error) {
      setError(true)
      setErrMes(error.response.data.message)
      return false;
    }
  }


  //ลงทะเบียนเรียน
  async function clickAdd() {
    await checkIsReg()
    try {
      const API_URL_ADD = `${process.env.NEXT_PUBLIC_API_URL}/student/add/subject/${idStudent}/${idSubject}`;
      const response2 = await axios.post(API_URL_ADD)
      setError(false)
      alert(response2.data.message)
    }
    catch (err) {
      setError(true)
      setErrMes(err.response.data.message)
    }

  }

  //ถอนรายวิชา
  async function clickDelete() {
    try {
      const API_URL_REMOV = `${process.env.NEXT_PUBLIC_API_URL}/student/delete/subject/${idStudent}/${idSubject}`;
      const response = await axios.delete(API_URL_REMOV)
      alert(response.data.message)
    } catch (err) {
      setError(true)
      setErrMes(err.response.data.message)
    }
  }

  useEffect(() => {
    if (user && user.username) {
      fetchData();
    }
  }, [user])

  useEffect(() => {
    if (idSubject) {
      fetchSubject();
    }
  }, [idSubject])

  return (
    <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl lg:w-[50%]'>
      <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>
        แก้ไขรายวิชา
      </p>

      <div className='w-full flex flex-col items-center'>
        <div className='h-auto w-full flex flex-col gap-5 justify-center items-center lg:items-start lg:flex-row lg:gap-10'>
          <p className='self-center text-lg font-semibold text-black/70'>รหัสวิชา :</p>
          <div>
            <input
              id='id'
              onChange={(e) => setIdsubject(e.target.value)}
              className='px-4 w-full h-9 border-b rounded-none'
            />

            {/*ERROR BOX MUI */}
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
            ลงทะเบียน
          </button>
          <button
            onClick={clickDelete}
            className='w-auto px-6 py-2 mx-3 font-bold text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]'
          >
            ถอน
          </button>
        </div>

        <div className='w-full h-full py-10 px-10 lg:px-30'>
          <div className='flex mb-7'>
            <p className='text-lg mr-3 text-black/70'>ชื่อวิชา : </p>
            <p className='self-center text-lg text-[#BB3E00]'>{!error && subject.subject_name}</p>
          </div>
        </div>
      </div>
    </div>


  )
}