"use client"
import React from 'react'
import { useState } from 'react'
import BoardAdmin from '@/components/boards/boardAdmin'

function Admin() {
  return (
    <div className='w-full h-full flex flex-col items-center text-start'>
      <div className='w-[80%] flex justify-center my-20 lg:w-[40%] '>
        <BoardAdmin />
      </div>
    </div>
  )
}

export default Admin

