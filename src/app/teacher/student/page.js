"use client"
import React from 'react'
import StudentComponent from '@/components/teacher/studentComonent';
import LoadingMui from '@/components/loadingMui';
import { Suspense } from 'react';

export default function Student() {
  return (
    <div className=' w-full flex justify-center '>
      <Suspense fallback={<div><LoadingMui /></div>}>
        {/* ใส่เกรดนิสิต */}
        <StudentComponent />
      </Suspense>
    </div>
  );
}