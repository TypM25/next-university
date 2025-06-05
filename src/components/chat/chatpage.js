'use client'; // ถ้าอยู่ใน /app directory ต้องมีบรรทัดนี้

import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import AuthService from '@/services/auth.service';
import axios from 'axios';

//user_sender idผู้ส่งข้อความ
//user_receiver idผู้รับข้อความ
export default function ChatPage({ user_sender, user_receiver }) {
  // const [user_sender, setIdUser] = useState("")
  const endRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const newDate = new Date();
  const socketRef = useRef();

  //แปลงวันที่
  function formatDate(d) {
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543} ` +
      `${date.toTimeString().split(' ')[0]}`;
  };

  //กดส่งข้อความ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    // ส่งข้อความไป server
    socketRef.current.emit('chat_message', input);
    setInput('');
  };

  //fetchประวัติแชท
  async function fetchMessages() {
    if (user_sender) {
      try {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user/all/chat`;
        const response = await axios.post(API_URL, {
          user1: user_sender,
          user2: user_receiver
        });
        console.log("Fetch Chat datas :", response.data.data);
        setMessages(response.data.data);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    }
  }

  useEffect(() => {
    if (!user_sender) return;
    //หาroom chat
    socketRef.current = io('http://localhost:9000', {
      auth: {
        user_id: user_sender,
        chat_partner_id: user_receiver,
        token: AuthService.getToken()
      }
    });

    //เมื่อเชื่อมต่อ
    socketRef.current.on('connect', () => {
      console.log('✅ Connected to socket.io server');
    });

    //เมื่อส่งข้อความ
    socketRef.current.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user_sender]);


  useEffect(() => {
    fetchMessages();
  }, [user_sender])

  //scrollbar ของแชท เลื่อนล่างสุด
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <ul id="messages" className="flex-grow overflow-auto rounded p-2">
        {messages.map((msg, index) => (
          <li
            key={`${msg.id}-${index}`}
            className={`mb-1 ${msg.sender_id === user_sender ? 'text-right' : 'text-left'}`}
          >
            <span className="inline-block bg-gray-100 px-3 py-2 rounded">
              {/* เเสดงข้อความ */}
              {msg.message}
            </span>
            <div className="text-xs text-gray-400">
              {/* แสดงวันที่ */}
              {formatDate(newDate)}
            </div>
          </li>
        ))}
        <div ref={endRef} />
      </ul>

      {/* แถบส่งแชท */}
      <form id="form" onSubmit={handleSubmit} className="flex p-1 gap-2 bg-gray-200">
        <input
          id="input" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off"
          className="w-[80%] px-2 flex-grow rounded-full bg-white" />
        <button type="submit">
          <img src="/img/send.png" className="rounded-full w-6 h-7 hover:cursor-pointer" />
        </button>
      </form>
    </>

  );
}
