"use client"
import { useEffect } from 'react';
import { useState } from 'react';
import RadioEvaluation from '@/components/evaluation/radioEvluaion';
import axios from 'axios';
import AuthService from '@/services/auth.service';
import { useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import LoadingMui from '@/components/loadingMui';

export default function Evaluation() {
    //อ่านค่าparamsที่ส่งมา
    const searchParams = useSearchParams();
    const student_id = searchParams.get('student_id');
    const teacher_id = searchParams.get('teacher_id');
    const term_id = searchParams.get('term_id');


    if (!student_id || !teacher_id || !term_id) {
        return <div > 
            <LoadingMui/>
        </div>;
    }

    //ถ้ามีค่าเเล้ว
    return (
        <div className="mt-10">
            <RadioEvaluation
                student_id={student_id}
                teacher_id={teacher_id}
                term_id={term_id}
            />
        </div>
    );
}
