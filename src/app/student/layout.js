"use client"
import StudentNavbar from "@/components/navbars/studentNavbar"
import ChatIcon from "@/components/chat/chatIcon"
import AuthService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";

export default function StudentLayout({ children }) {
  const [user, setUser] = useState()
  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);
  return (
    <div className='relative min-h-screen w-screen bg-[#FEF9E1] overflow-hidden '>
      <header className="fixed p-4 w-full z-50">
        <StudentNavbar />
      </header>

      <main >
        <div className='flex justify-center items-center min-h-screen w-screen py-14 lg:py-20'>
          {children}
          {user && <ChatIcon user_id={user.user_id} role={user.role[0]} />}
        </div>
      </main>

      <footer className="w-full h-10 text-center text-sm py-4 bg-black">
        <p className="text-white">© 2025 Student</p>
      </footer>


    </div>
  )
}