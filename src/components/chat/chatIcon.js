
"use client"
import React, { use, useEffect, useState } from 'react'
import ChatContact from './chatContact'
import axios from 'axios'

export default function ChatIcon({ user_id, role }) {
    const [isClick, setIsClick] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [idSub, setIdSub] = useState([])
    const [newData, setNewData] = useState([])

    const API_SUB_ID = `${process.env.NEXT_PUBLIC_API_URL}/${role}/find/byuser/${user_id}`;
    const API_CONTACT = `${process.env.NEXT_PUBLIC_API_URL}/${role}/find/multi/subject`;

    const API_IMAGE = `${process.env.NEXT_PUBLIC_API_URL}/${role}/find/multi/files`;


    async function handleCkick(e) {
        e.preventDefault();
        setIsClick(prev => !prev)
    }
    //นิสิตมี idSub = [1,2,3]  
    //อาจารย์ idSub = [1]
    async function fetchIdSubject() {
        try {
            const response = await axios.get(API_SUB_ID)
            if (role === "student") {
                setIdSub(response.data.data.subjects?.map((sub) => sub.subject_id))
            }
            else if (role === "teacher") {
                const subjectId = response.data.data.subject_id;
                setIdSub(Array.isArray(subjectId) ? subjectId : [subjectId]);
            }
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }

    async function fetchContact() {
        try {
            const response = await axios.post(API_CONTACT, idSub.map(id => ({ subject_id: id }))); //ทำให้idStud เป็นarray objectก่อน
            if (role === "student") {
                setTeachers(response.data.data.flatMap(subject => subject.teachers))

            }
            else if (role === "teacher") {
                setStudents(response.data.data.flatMap(subject => subject.students))
            }

        }
        catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async function formatData() {
        if (teachers && teachers.length > 0) {
            setNewData(teachers.map(t => ({
                id: t.teacher_id,
                first_name: "อ. " + t.teacher_first_name,
                last_name: t.teacher_last_name,
                user_id: t.user_id,
               
            })));
        }
        else if (students && students.length > 0) {
            setNewData(students.map(t => ({
                id: t.student_id,
                first_name: t.student_first_name,
                last_name: t.student_last_name,
                user_id: t.user_id,
               
            })));
        }
    }


    useEffect(() => {
        fetchIdSubject()
    }, [])

    useEffect(() => {
        if (idSub?.length > 0) {
            fetchContact();
        }
    }, [idSub])

    useEffect(() => {
        formatData();
    }, [students, teachers])

    console.log("teachers : ", teachers)
    console.log("students : ", students)
    console.log("newData : ", newData)
    console.log("idSub : ", idSub)



    return (
        <div className='flex flex-between'>
            {isClick &&
                <div className='fixed right-20 bottom-22 z-20'>
                    <ChatContact API_IMAGE={API_IMAGE} contacts={newData} />
                </div>
            }
            <div>
                <img src="/img/chat.png" onClick={handleCkick}
                    className="fixed w-15 h-15 z-19 right-10 bottom-10 rounded-full  
                transition-transform  duration-300 hover:rotate-20  " />
            </div>
        </div>
    )
}
