"use client"
import TeacherNavbar from "@/components/navbars/teacherNavbar";
import ChatIcon from "@/components/chat/chatIcon"
import AuthService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";


export default function TeachertLayout({ children }) {
  const [user, setUser] = useState()
  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);
  // console.log("------------------------",user.role)
  return (
    <div className='relative h-full w-full bg-[#EAD196] overflow-auto'>
      <header className="fixed p-4 w-full z-50">
        <TeacherNavbar />
      </header>

      <main >
        <div className='flex justify-center items-center min-h-screen w-full py-14 lg:py-28'>
          {children}
          {user && <ChatIcon user_id={user.user_id} role={user.role[0]} />}
        </div>
      </main>

      <footer className="w-full h-10 text-center text-sm py-4 bg-black">
        <p className="text-white">© 2025 Teacher</p>
      </footer>

    </div>
  )
}