"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/services/auth.service';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL_SEMESTER = `${process.env.NEXT_PUBLIC_API_URL}/teacher/check/semester`;

function TeacherNavbar() {
  // const [idTeacher, setIdTeacher] = useState(0)
  const [user, setUser] = useState("")
  const [teacher, setTeacher] = useState("")
  const [term, setTerm] = useState("")
  //ถ้า Teacher มีค่าเมื่อไหร่ ก็แปลว่าลงทะเบียนแล้วทันที

  const router = useRouter();

  async function checksemester() {
    try {
      let response = await axios.get(API_URL_SEMESTER)
      if (response.data.isOpen === true) {
        console.log("grade all term_id :", response.data.data.term_id)
        console.log("formnavbar :", response.data.message)
        setTerm(response.data.data)
      }
      else {
        console.log(response.data.message)
      }
    }
    catch (error) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    const token = AuthService.getToken();
    const decoded = jwtDecode(token);
    setUser(decoded);
  }, []);


  useEffect(() => {
    async function fetchData() {
      if (user && user.username) {
        console.log("username Teacher_page :", user.username)
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/teacher/find/byuser/${user.user_id}`;
        try {
          const response = await axios.get(API_URL);
          setTeacher(response.data.data)
        }
        catch (error) {
          if (error.response && error.response.status === 404) {
            // ถ้ายังไม่ลงทะเบียนก็ไม่ต้องตั้งค่า teacher
            console.log("ยังไม่ได้ลงทะเบียนเป็นอาจารย์");
            setTeacher(null);
          } else {
            console.error("Error fetching teacher:", error);
          }
        }
      }
    }
    fetchData();
    checksemester();
  }, [user])

  const logOut = () => {
    AuthService.logout()
    router.push('/login')
  };

  return (
    <div className='flex justify-between items-center py-2 px-10 rounded-lg h-20 p-5 bg-[#A31D1D]
    motion-translate-x-in-[0%] motion-translate-y-in-[-31%] motion-opacity-in-[0%] motion-blur-in-[5px]'>

      <nav className='flex flex-cols w-full justify-between'>
        <div className='flex gap-10 items-center'>
          {/* <Link href="/Teacher" className='text-3xl font-bold'>{Teacher.Teacher_id} </Link> */}
          <Link href="/teacher" className=' text-4xl font-bold text-[#EEEEEE]'>Teacher : {user.username}</Link>
        </div>
        <ul className='flex justify-between items-center gap-10'>
          <li ><a href="/teacher" className='cursor-pointer text-3xl font-semibold text-[#EEEEEE] 
          hover:text-white/60'>
            หน้าหลัก</a></li>
          {
            !teacher &&
            <li ><a href="/teacher/create" className='cursor-pointer text-3xl font-semibold text-[#EEEEEE] 
            hover:text-white/60'>
              ลงทะเบียนอาจารย์</a>
            </li>
          }

          <li className='relative'>
            <div className="relative group inline-block text-left">
              <button className="cursor-pointer text-[#EEEEEE] text-3xl font-semibold 
              hover:text-white/60 ">
                รายวิชา
              </button>
              <div className="absolute left-0 bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <ul className="py-1">
                  <li>
                    <a href="/teacher/subject/add" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      แก้ไขรายวิชา
                    </a>

                  </li>
                  <li>
                    <a href={`/teacher/subject/student?subject_id=${teacher?.subject_id}`} className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      นิสิตทั้งหมด
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li className='relative'>
            <div className="relative group inline-block text-left">
              <Link href={`/teacher/grade/gradeAll?subject_id=${teacher?.subject_id}&term_id=${term?.term_id}`} className="cursor-pointer text-[#EEEEEE] text-3xl font-semibold 
              hover:text-white/60 ">
                เกรด
              </Link>
            </div>
          </li>

          <li><a onClick={logOut} className='cursor-pointer text-3xl font-semibold text-[#EEEEEE] 
          hover:text-white/60' >
            ล็อกเอาท์</a></li>
        </ul>
      </nav>

    </div>
  )
};


export default TeacherNavbar