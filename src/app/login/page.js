"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthService from '@/services/auth.service'
import axios from 'axios'
import { fetchuserToken } from '../../../next.config.mjs'
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import LoginBar from '@/components/loginbar'
import PasswordBar from '@/components/passwordbar'
import ChatPage from '@/components/chat/chatpage'

import { io } from 'socket.io-client';

export default function Login() {

  // const data = {
  //   username: '',
  //   password: ''
  // }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errMes, setErrMes] = useState("")

  const router = useRouter();


  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError(true)
      return setErrMes("กรุณากรอกข้อมูลให้ครบ")
    }

    try {
      const user = await AuthService.login(username, password);

      if (user) {
        setError(false)
        const token = await AuthService.getToken();
        const decoded = jwtDecode(token)

        // console.log(userToken)
        if (token) {
          const showAdminBoard = decoded.role.includes("admin");
          const showStudentBoard = decoded.role.includes("student");
          const showTeacherBoard = decoded.role.includes("teacher");
          // console.log("showAdminBoard :", showAdminBoard)
          // console.log("showStudentBoard :", showStudentBoard)
          if (showAdminBoard) {
            return router.push('/admin');
          }
          else if (showStudentBoard) {
            return router.push('/student');
          }
          else if (showTeacherBoard) {
            return router.push('/teacher');
          }
        }
        // router.push('/profile');
      }

    } catch (error) {

      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) || error.message
      setError(true)
      setErrMes(resMessage);
    }
  }

  function handleChange(e) {
    const id = e.target.id
    if (id === 'username') {
      setUsername(e.target.value)
    }
    if (id === 'password') {
      setPassword(e.target.value)
    }
  }

  useEffect(() => {
    localStorage.removeItem("token");
    Cookies.remove("accessToken");
  }, [])

  return (
    <div className="w-screen h-screen  flex justify-center items-center bg-[#FEF9E1]">
      <div className='relative h-[60%] w-[70%] flex flex-col justify-center items-center  rounded-[50px] bg-[#A31D1D] shadow-xl shadow-yellow-500/50 
      lg:w-[30%] lg:h-[70%]
      motion-scale-in-[0.5] motion-opacity-in-[0%] motion-duration-[300ms] motion-ease-spring-bouncier'>
        <img src="/img/bus.png" alt="หมวก" className="absolute w-32 h-32 -top-22 left-14 
        motion-preset-shake motion-duration-900" />
        <h1 className='text-3xl text-[#EEEEEE] mb-10 font-bold z-6
        lg:text-5xl lg:mb-15'>
          เข้าสู่ระบบ
        </h1>
        <form className='w-[70%] flex flex-col 
        lg:w-[60%]'>
          <ul className="w-full flex flex-col gap-[10%]
          lg:gap-6">
            <li>
              <p className='self-start text-lg font-semibold text-[#E5D0AC]
              lg:text-xl'>
                ชื่อผู้ใช้งาน</p>
              <input id='username' onChange={handleChange} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text'></input>
            </li>
            <li>
              <p className='self-start text-lg  font-semibold text-[#E5D0AC]
              lg:text-xl'>
                รหัสผ่าน</p>
              <input id='password' onChange={handleChange} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='password'></input>

            </li>
          </ul>
          {
            error && <div className="flex items-center p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{errMes}</span>
              </div>
            </div>
          }
        </form>
        <div className='w-[70%] gap-10 flex justify-between self-center mt-10
          lg:w-[50%]'>
          <button type="submit" onClick={handleSubmit} className='cursor-pointer self-center w-auto max-h-10 py-2 px-4 bg-[#EEEEEE] rounded-full text-sm text-black/70 font-bold 
              md:text-lg
              hover:bg-gray-400 hover:text-white' >
            ล็อคอิน</button>
          <button type='button' onClick={() => router.push('/register')} className='cursor-pointer self-center w-auto max-h-10 py-2 px-4 bg-[#F9CB43] rounded-full text-sm text-black/70 font-bold 
             md:text-lg
             hover:bg-amber-400 hover:text-white'>
            ลงทะเบียน</button>
        </div>
      </div>
    
      
    </div>
  )
}

