"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/services/auth.service';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL_SEMESTER = `${process.env.NEXT_PUBLIC_API_URL}/student/check/semester`;

function StudentNavbar() {
  // const [idStudent, setIdStudent] = useState(0)
  const [user, setUser] = useState("")
  const [student, setStudent] = useState(null)
  const [canReg, setCanReg] = useState(false)
  //ถ้า student มีค่าเมื่อไหร่ ก็แปลว่าลงทะเบียนแล้วทันที

  const router = useRouter();

  async function checksemester() {
    try {
      let response = await axios.get(API_URL_SEMESTER)
      if (response.data.isOpen === true) {
        setCanReg(true)
        console.log("formnavbar :",response.data.message)
      }
      else {
        setCanReg(false)
        console.log(response.data.message)
      }
    }
    catch (err) {
      console.log(err.response.data.message)
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
        console.log("username student_page :", user.username)
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`;
        // const data = {
        //   username: user.username
        // }
        try {
          const response = await axios.get(API_URL);
          setStudent(response.data.data)
        }
        catch (error) {
          if (error.response && error.response.status === 404) {
            // ถ้ายังไม่ลงทะเบียนก็ไม่ต้องตั้งค่า teacher
            console.log("ยังไม่ได้ลงทะเบียนนิสิต");
            setStudent(null);
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
    <div className='flex justify-between items-center py-2 px-10 rounded-lg h-25 p-5 bg-[#A31D1D]
    motion-translate-x-in-[0%] motion-translate-y-in-[-31%] motion-opacity-in-[0%] motion-blur-in-[5px]'>
      <nav className='flex flex-cols w-full justify-between'>
        <div className='flex gap-10 items-center'>
          {/* <Link href="/student" className='text-3xl font-bold'>{student.student_id} </Link> */}
          <Link href="/student" className=' text-5xl font-bold text-[#FEF9E1]'>{user.username}</Link>
        </div>
        <ul className='flex justify-between items-center gap-10'>
          <li ><a href="/student" className='cursor-pointer text-[#FEF9E1] text-3xl font-semibold hover:text-white/70'>
            หน้าหลัก</a></li>
          {
            !student &&
            <li ><a href="/student/create" className='cursor-pointer text-[#FEF9E1] text-3xl font-semibold hover:text-white/70'>
              ลงทะเบียนนิสิต</a>
            </li>
          }
          <li className='relative'>
            <div className="relative group inline-block text-left">
              <button className="cursor-pointer text-[#FEF9E1] text-3xl font-semibold hover:text-white/70">
                รายวิชา
              </button>
              <div className="absolute left-0 bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <ul className="py-1">
                  <li>
                    <a href="/student/subject/subjectAll" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                      วิชาที่ลงทะเบียน
                    </a>
                  </li>
                  {
                    canReg &&
                    <li>
                      <a href="/student/subject/subjectUpdate" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                        เพิ่ม/ถอนรายวิชา
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </li>
          <li><a onClick={logOut} className='cursor-pointer text-[#FEF9E1] text-3xl font-semibold hover:text-white/70' >
            ล็อกเอาท์</a></li>
        </ul>
      </nav>

    </div>
  )
};


export default StudentNavbar