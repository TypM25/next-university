"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

export default function BoardAdmin() {
  const router = useRouter();

  return (
    <div className='w-full mx-20 flex flex-col justify-center items-center'>
      <div className='text-center'>
        <p className='w-fit text-3xl text-[#8E1616] font-semibold my-10 
        lg:m-20'>
          ผู้ดูแลระบบ</p>
      </div>
      
      <div className='w-auto h-auto grid grid-rows-auto gap-5 px-4 py-4 justify-center items-center rounded-3xl bg-[#8E1616]
      lg:py-6 lg:px-8'>
        <button onClick={() => { router.push("/admin/student/studentAll") }}
          className='cursor-pointer bg-white w-full h-20 rounded-xl  
      hover:bg-gray-100 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out px-2 lg:px-10'>
          <span href="/admin/student/studentAll" className='text-lg lg:text-2xl'>
            ข้อมูลนิสิตทั้งหมด</span>
        </button>

        <button onClick={() => { router.push("/admin/student/studentReg") }}
          className='cursor-pointer bg-white w-full h-20 rounded-xl
      hover:bg-gray-100 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out px-2 lg:px-10'>
          <span href="/admin/student/studentReg" className='text-lg lg:text-2xl'>
            ลงทะเบียนนิสิต</span>
        </button>
      </div>

    </div>
  )
}
