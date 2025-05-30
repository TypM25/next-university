"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import LoadingMui from '../loadingMui'
import ChatPage from './chatpage'
import AuthService from '@/services/auth.service'
import { jwtDecode } from 'jwt-decode';

//API_IMAGE เพื่อfetchรูปของผู้ติดต่อ
//contacts คือ ข้อมูลผู้ติดต่อทั้งหมด
export default function ChatContact({ API_IMAGE, contacts }) {
    const [imageList, setImageList] = useState([]);
    const [user_sender, setUser_Sender] = useState(""); //id คนส่ง
    const [user_receiver, setUser_Receiver] = useState(""); //id คนส่ง
    const [id_user_receivers, setId_User_Receivers] = useState([]) //idของcontactsทั้งหมด
    const [isChat, setIsChat] = useState(false) //กดไปยังห้องเเชท

    //เก็บ id คนส่งข้อความ
    useEffect(() => {
        const token = AuthService.getToken();
        const decoded = jwtDecode(token);
        setUser_Sender(decoded.user_id);
    }, [])

    //เมื่อกดรายการผู้ติดต่อ
    async function handleClickChat() {
        setIsChat(prev => !prev)
    }

    //เก็บ id คนรับข้อความทั้งหมด
    async function fetchData() {
        setId_User_Receivers(contacts.map((data) => data.user_id))
    }

    //เก็บรูปภาพทั้งหมด
    async function fetchImage() {
        try {
            const response = await axios.post(API_IMAGE, id_user_receivers.map(id => ({ user_id: id })));
            setImageList(response.data.data)
        }
        catch (err) {
            console.log(err.response.data?.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (id_user_receivers?.length > 0) {
            fetchImage()
        }
    }, [id_user_receivers])

    return (
        <div className='relative w-60 h-90 flex flex-col bg-white rounded-sm 
        motion-translate-x-in-[12%] motion-translate-y-in-[6%] motion-duration-300'>
            <div className="relative w-full h-10 text-center sticky py-2 top-0 right-0 left-0 z-9 bg-[#A31D1D]">
                {/* ปุ่มย้อนกลับ */}
                {isChat && <img src="/img/back.png" onClick={() => setIsChat(false)}
                    className='absolute rounded-full w-8 h-8 z-10 top-1 left-1 hover:cursor-pointer' />}
                <p className='font-semibold text-white'>{isChat ? "ห้องแชท" : "รายชื่อติดต่อ"}</p>
            </div>

            {isChat ?
                // ถ้ากดเเชทไปยัง Chatpage Component
                <ChatPage user_sender={user_sender} user_receiver={user_receiver} />
                // ถ้าไม่กด โชว์รายการผู้ติดต่อ
                : <ul className='w-full h-full flex flex-col flex-grow overflow-auto'>

                    {Array.isArray(contacts) && contacts.length > 0 ?
                        contacts.map((data, index) => {
                            const image = imageList?.find(img => img.user_id === data.user_id)
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        //เก็บ id ผู้รับข้อความ
                                        setUser_Receiver(data.user_id);
                                        handleClickChat();
                                    }}
                                    className='flex items-center gap-5 border-b border-black/10 p-3 hover:bg-gray-100 hover:cursor-pointer'>
                                    {image ? <img key={index} src={`${process.env.NEXT_PUBLIC_API_URL}${image?.url}`} className='rounded-full w-11 h-11' />
                                        : <img key={index} src="/img/guest1.png" className='rounded-full w-12 h-12' />
                                    }
                                    <p>{data.first_name + " " + data.last_name}</p>
                                </li>
                            )
                        })
                        :
                        contacts?.length === 0 ?
                            <div className='w-full h-full flex justify-center items-center text-gray-400 text-sm'>
                                ไม่มีรายชื่อติดต่อ
                            </div>
                            :
                            <div className='w-full h-full flex justify-center items-center'>
                                <LoadingMui />
                            </div>
                    }
                </ul>
            }
        </div>
    )
}
