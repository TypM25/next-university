"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";

export default function AdminNavbar() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) setUser(jwtDecode(token));
  }, []);

  const logOut = () => {
    AuthService.logout();
    router.push("/login");
  };

 

  return (
    <nav className="flex flex-col justify-between px-4 py-3 bg-black text-white rounded-lg md:flex-row">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
        <Link href="/admin" className="text-3xl font-bold text-[#FEF9E1]">
          {user.username}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#FEF9E1] focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"
          } mt-4 md:mt-0 md:flex md:items-center md:justify-center`}
      >
        <ul className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-6 text-lg font-semibold gap-4 md:px-0">
          <li>
            <Link
              href="/admin"
              className="block text-xl md:text-2xl hover:text-white/70"
            >
              หน้าหลัก
            </Link>
          </li>

          {/* ผู้ใช้งาน */}
          <li className="relative group text-xl md:text-2xl">
            <button
              onClick={() =>
                //ถ้า dropdownOpen === "user" เปิดอยู่ → ปิด 
                //ถ้าไม่ได้เปิดอยู่เก็บค่าtitle
                setDropdownOpen(dropdownOpen === "user" ? null : "user")} 
              className="w-full text-left hover:text-white/70">
              ผู้ใช้งาน
            </button>
            <div className={`${dropdownOpen === "user" ? "block" : "hidden"}
               md:group-hover:block absolute top-6 left-5 bg-white text-gray-700 mt-2 rounded shadow-lg w-48 z-10`}>
              <Link
                href="/admin/user/userAll"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                ผู้ใช้ทั้งหมด
              </Link>
              <Link
                href="/admin/user/userReg"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                ลงทะเบียนผู้ใช้
              </Link>
              <Link
                href="/admin/user/userUpdate"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                แก้ไขข้อมูลผู้ใช้
              </Link>
            </div>
          </li>

          {/* นิสิต */}
          <li className="relative group text-xl md:text-2xl">
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "student" ? null : "student")
              }
              className="w-full text-left hover:text-white/70"
            >
              นิสิต
            </button>
            <div
              className={`${dropdownOpen === "student" ? "block" : "hidden"
                } md:group-hover:block absolute top-6 left-5 bg-white text-gray-700 mt-2 rounded shadow-lg w-48 z-10`}
            >
              <Link
                href="/admin/student/studentAll"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                นิสิตทั้งหมด
              </Link>
              <Link
                href="/admin/student/studentReg"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                ลงทะเบียนนิสิต
              </Link>
              <Link
                href="/admin/student/studentFind"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                ค้นหานิสิต
              </Link>
              <Link
                href="/admin/student/studentUpdate"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                แก้ไขข้อมูลนิสิต
              </Link>
            </div>
          </li>

          {/* อาจารย์ */}
          <li className="relative group text-xl md:text-2xl">
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "teacher" ? null : "teacher")
              }
              className="w-full text-left hover:text-white/70"
            >
              อาจารย์
            </button>
            <div
              className={`${dropdownOpen === "teacher" ? "block" : "hidden"
                } md:group-hover:block absolute top-6 left-5 bg-white text-gray-700 mt-2 rounded shadow-lg w-48 z-10`}
            >
              <Link
                href="/admin/teacher/teacherAll"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                อาจารย์ทั้งหมด
              </Link>
              <Link
                href="/admin/teacher/teacherReg"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                ลงทะเบียนอาจารย์
              </Link>
              <Link
                href="/admin/teacher/teacherUpdate"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                แก้ไขอาจารย์
              </Link>
              <Link
                href="/admin/teacher/teacherRating"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                เรตติ้งอาจารย์
              </Link>
            </div>
          </li>

          {/* รายวิชา */}
          <li className="relative group text-xl md:text-2xl">
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "subject" ? null : "subject")
              }
              className="w-full text-left hover:text-white/70"
            >
              รายวิชา
            </button>
            <div
              className={`${dropdownOpen === "subject" ? "block" : "hidden"
                } md:group-hover:block absolute top-6 left-5 bg-white text-gray-700 mt-2 rounded shadow-lg w-48 z-10`}
            >
              <Link
                href="/admin/subject/subjectAll"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                รายวิชาทั้งหมด
              </Link>
              <Link
                href="/admin/subject/subjectUpdate"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                แก้ไขรายวิชา
              </Link>
            </div>
          </li>

          {/* เทอม */}
          <li className="relative group text-xl md:text-2xl">
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "semester" ? null : "semester")
              }
              className="w-full text-left hover:text-white/70"
            >
              เทอม
            </button>
            <div
              className={`${dropdownOpen === "semester" ? "block" : "hidden"
                } md:group-hover:block absolute top-6 left-5 bg-white text-gray-700 mt-2 rounded shadow-lg w-48 z-10`}
            >
              <Link
                href="/admin/semester/semesterAll"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                เทอมทั้งหมด
              </Link>
              <Link
                href="/admin/semester/semesterUpdate"
                className="block text-xl px-4 py-2 hover:bg-gray-100"
              >
                แก้ไขเทอม
              </Link>
            </div>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={logOut}
              className="text-xl md:text-2xl hover:text-white/70"
            >
              ล็อกเอาท์
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
