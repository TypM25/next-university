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

import ChatPage from '@/components/chat/chatpage'

import { io } from 'socket.io-client';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  //Error message box
  const [error, setError] = useState(false)
  const [errMes, setErrMes] = useState("")

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    //ดักinput
    if (!username || !password) {
      setError(true)
      return setErrMes("กรุณากรอกข้อมูลให้ครบ")
    }


    const { accessToken, message } = await AuthService.login(username, password);
    if (accessToken) {
      setError(false)
      const decoded = jwtDecode(accessToken)
      const showAdminBoard = decoded.role.includes("admin");
      const showStudentBoard = decoded.role.includes("student");
      const showTeacherBoard = decoded.role.includes("teacher");
      if (showAdminBoard) {
        return router.push('/admin');
      }
      else if (showStudentBoard) {
        return router.push('/student');
      }
      else if (showTeacherBoard) {
        return router.push('/teacher');
      }

      // router.push('/profile');
    }
    else {
      setError(true);
      setErrMes(message);
    }
  }

  useEffect(() => {
    AuthService.logout();
  }, []);

  return (
    <div className="w-screen h-screen  flex justify-center items-center bg-[#FEF9E1]">
      <div className='relative h-[60%] w-[70%] flex flex-col justify-center items-center rounded-[50px] bg-[#A31D1D] shadow-xl shadow-yellow-500/50 
      lg:w-[30%] lg:h-[80%]
      motion-scale-in-[0.5] motion-opacity-in-[0%] motion-duration-[300ms] motion-ease-spring-bouncier'>
        <img src="/img/bus.png" alt="หมวก" className="absolute w-32 h-32 -top-22 left-14 
        motion-preset-shake motion-duration-900" />


        <form className='w-[60%] flex flex-col justify-center items-center text-center
        lg:w-[60%]'>
         <h1 className='text-3xl text-[#EEEEEE] mb-5 font-bold z-6 whitespace-nowrap
            md:text-3xl lg:mb-10
            lg:text-5xl lg:mb-10'>
            เข้าสู่ระบบ
          </h1>
          <ul className="w-full flex flex-col gap-[10%] text-start
          lg:gap-6">
            <li>
              <p className='self-start text-lg font-semibold text-[#E5D0AC]
              lg:text-xl'>
                ชื่อผู้ใช้งาน</p>
              <input id='username' onChange={(e) => setUsername(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text'></input>
            </li>
            <li>
              <p className='self-start text-lg  font-semibold text-[#E5D0AC]
              lg:text-xl'>
                รหัสผ่าน</p>
              <input id='password' onChange={(e) => setPassword(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='password'></input>

            </li>
          </ul>

          {/*ERROR BOX MUI */}
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
          <div className='block w-full gap-10 flex justify-center mt-10 
           '>
            <button type="submit" onClick={handleSubmit} className='cursor-pointer self-center w-auto max-h-10 py-2 px-4 bg-[#F9CB43] rounded-full whitespace-nowrap text-sm text-black/70 font-bold 
              lg:text-lg
              hover:bg-amber-400 hover:text-white' >
              ล็อคอิน</button>
            <button type='button' onClick={() => router.push('/register')} className='cursor-pointer self-center w-auto max-h-10 py-2 px-4 bg-[#EEEEEE] rounded-full whitespace-nowrap text-sm text-black/70 font-bold 
             lg:text-lg
             hover:bg-gray-400 hover:text-white'>
              ลงทะเบียน</button>
          </div>
        </form>
      </div>


    </div>
  )
}

