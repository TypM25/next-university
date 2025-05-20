"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import LoadingMui from '../loadingMui'
import ChatPage from './chatpage'
import AuthService from '@/services/auth.service'
import { jwtDecode } from 'jwt-decode';

export default function ChatContact({ API_IMAGE, contacts }) {
    const [imageList, setImageList] = useState([]);
    const [user_sender, setUser_Sender] = useState(""); //id คนส่ง
    const [user_receiver, setUser_Receiver] = useState(""); //id คนส่ง
    const [id_user_receivers, setId_User_Receivers] = useState([]) //idของcontactsทั้งหมด
    const [isChat, setIsChat] = useState(false)

    async function handleClickChat() {
        setIsChat(prev => !prev)
    }

    async function fetchData() {
        setId_User_Receivers(contacts.map((data) => data.user_id))
        // try {
        //     // const API_CONTACT = `${process.env.NEXT_PUBLIC_API_URL}/student/all/teacher`;
        //     const response = await axios.post(API_CONTACT)
        //     setTeacher(response.data.data)
        //     setId_User_Receivers(response.data.data.map((data) => data.user_sender))
        // }
        // catch (error) {
        //     console.log(error.response.data.message)
        // }
    }

    useEffect(() => {
        const token = AuthService.getToken();
        const decoded = jwtDecode(token);
        setUser_Sender(decoded.user_id);

        fetchData()
    }, [])

    useEffect(() => {
        if (id_user_receivers?.length > 0) {
            async function fetchImage() {
                try {
                    const response = await axios.post(API_IMAGE, id_user_receivers.map(id => ({ user_id: id })));
                    setImageList(response.data.data)
                }
                catch (err) {
                    console.log(err.response.data?.message)
                }
            }
            fetchImage()
        }
    }, [id_user_receivers])


    return (
        <div className='relative w-60 h-90 flex flex-col bg-white rounded-sm 
        motion-translate-x-in-[12%] motion-translate-y-in-[6%] motion-duration-300'>
            <div className="relative w-full h-10 text-center sticky py-2 top-0 right-0 left-0 z-9 bg-[#A31D1D]">
                {isChat && <img src="/img/back.png" onClick={(() => setIsChat(false))}
                    className='absolute rounded-full w-8 h-8 z-10 top-1 left-1 hover:cursor-pointer' />}
                <p className='font-semibold text-white'>{isChat ? "ห้องแชท" : "รายชื่อติดต่อ"}</p>
            </div>
            {isChat ?
                <ChatPage user_sender={user_sender} user_receiver={user_receiver} />
                : <ul className='w-full h-full flex flex-col flex-grow overflow-auto'>
                    {Array.isArray(contacts) && contacts.length > 0 ?
                        contacts.map((data, index) => {
                            const image = imageList.find(img => img.user_id === data.user_id)
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
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
                        <div className='w-full h-full flex justify-center items-center'>
                            <LoadingMui />
                        </div>
                    }
                </ul>
            }
        </div>
    )
}
