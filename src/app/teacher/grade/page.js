"use client"
import React from 'react'
import GradeComponent from '@/components/teacher/gradeComponent'
import LoadingMui from '@/components/loadingMui';
import { Suspense } from 'react';

export default function Grade() {
  return (
    <div className='w-full flex justify-center'>
      <Suspense fallback={<div><LoadingMui /></div>}>
        {/* เกรดนิสิตทั้งหมด */}
        <GradeComponent />
      </Suspense>
    </div>
  );
}