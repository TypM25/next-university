"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';


function AdminNavbar(req) {
    const router = useRouter();
    const [user, setUser] = useState("")

    useEffect(() => {
        const token = AuthService.getToken();
        const decoded = jwtDecode(token);
        setUser(decoded);
    }, []);



    const logOut = () => {
        AuthService.logout();
   
        router.push('/login')
    };

    return (
        <div className='flex justify-between items-center py-2 px-10 rounded-lg h-20 w-full bg-black 
        motion-translate-x-in-[0%] motion-translate-y-in-[-31%] motion-opacity-in-[0%] motion-blur-in-[5px] '>
       
                <nav className='flex flex-cols w-full justify-between'>
                    <Link href="/student" className='text-4xl text-white/50 font-bold'>{user.username}</Link>
                    <ul className='flex justify-between items-center gap-10'>
                        <li ><a href="/admin" className='cursor-pointer text-white text-2xl font-semibold  '>หน้าหลัก</a></li>
                        <li className='relative'>
                            <div className="relative group inline-block text-left">
                                <button className="cursor-pointer text-white text-2xl font-semibold">
                                    ผู้ใช้งาน
                                </button>
                                <div className="absolute left-0 bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                                    <ul className="py-1">
                                        <li>
                                            <a href="/admin/user/userAll" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                ผู้ใช้ทั้งหมด
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/user/userReg" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                ลงทะเบียนผู้ใช้
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/user/userUpdate" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                แก้ไขข้อมูลผู้ใช้
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className='relative'>
                            <div className="relative group inline-block text-left">
                                <button className="cursor-pointer text-white text-2xl font-semibold  ">
                                    นิสิต
                                </button>
                                <div className="absolute left-0 bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                                    <ul className="py-1">
                                        <li>
                                            <a href="/admin/student/studentAll" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                นิสิตทั้งหมด
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/student/studentReg" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                ลงทะเบียนนิสิต
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/student/studentFind" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                ค้นหานิสิต
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/student/studentUpdate" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                แก้ไขข้อมูลนิสิต
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className='relative'>
                            <div className="relative group inline-block text-left">
                                <button className="cursor-pointer text-white text-2xl font-semibold  ">
                                    อาจารย์
                                </button>
                                <div className="absolute left-0 bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                                    <ul className="py-1">
                                        <li>
                                            <a href="/admin/teacher/teacherAll" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                อาจารย์ทั้งหมด
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/teacher/teacherReg" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                ลงทะเบียนอาจารย์
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/teacher/teacherUpdate" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                แก้ไขอาจารย์
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/teacher/teacherRating" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                เรตติ้งอาจารย์
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>


                        <li className='relative'>
                            <div className="relative group inline-block text-left">
                                <button className="cursor-pointer text-white text-2xl font-semibold  ">
                                    รายวิชา
                                </button>
                                <div className="absolute left-0 bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                                    <ul className="py-1">
                                        <li>
                                            <a href="/admin/subject/subjectAll" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                รายวิชาทั้งหมด
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/subject/subjectUpdate" className="text-xl hover:bg-gray-100 text-gray-700 block px-4 py-2">
                                                แก้ไขรายวิชา
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li ><a href="/admin/semester" className='cursor-pointer text-white text-2xl font-semibold'>เทอม</a></li>

                        <li><a onClick={logOut} className='cursor-pointer text-white text-2xl font-semibold hover:scale-125 ' >ล็อกเอาท์</a></li>
                    </ul>
                </nav>
          
        </div>
    )
};


export default AdminNavbar