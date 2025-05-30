"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL_SEMESTER = `${process.env.NEXT_PUBLIC_API_URL}/student/check/semester`;

export default function StudentNavbar() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [student, setStudent] = useState(null);
  const [canReg, setCanReg] = useState(false); //ลงทะเบียนนืสืต
  const [isOpen, setIsOpen] = useState(false); //navbar response
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  async function fetchCheckSemester() {
    try {
      const res = await axios.get(API_URL_SEMESTER);
      setCanReg(res.data.isOpen);
      console.log("formnavbar:", res.data.message);
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);
    }
  }

  async function fetchData() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/student/find/byuser/${user.user_id}`
      );
      setStudent(res.data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setStudent(null);
        console.log("ยังไม่ได้ลงทะเบียนนิสิต");
      }
      else {
        console.error("Error fetching student:", err);
      }
    }

  }

  useEffect(() => {
    const fetch = async () => {
      await fetchCheckSemester()
      if (user && user?.user_id) {
        await fetchData()
      };
    }
    fetch()
  }, [user]);

  const logOut = () => {
    AuthService.logout();
    router.push("/login");
  };

  //  เมนูรายวิชา
  const subjectMenu = [
    { name: "วิชาที่ลงทะเบียน", path: `/student/subject/subjectAll` },
    ...(canReg ?
      [
        { name: "เพิ่ม/ถอนรายวิชา", path: "/student/subject/subjectUpdate" }
      ]
      : []),
  ];

  return (
    <nav className="flex flex-col justify-between px-4 py-3 bg-[#A31D1D] text-[#FEF9E1] rounded-lg lg:flex-row">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
        <Link href="/student" className="text-3xl font-bold text-[#FEF9E1]">
          {user.username}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#FEF9E1] focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"
          } mt-4 lg:mt-0 lg:flex lg:items-center lg:justify-center`}
      >
        <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:space-x-6 text-lg font-semibold gap-4 lg:px-0">
          <li>
            <Link
              href="/student"
              className="block text-xl lg:text-2xl hover:text-white/70"
            >
              หน้าหลัก
            </Link>
          </li>

          {/* ถ้ายังไม่ได้ลงทะเบียนนิสิต */}
          {!student && (
            <li onClick={() => {
              setDropdownOpen(null)
              setIsOpen(false)
              return
            }}>
              <Link
                href="/student/create"
                className="block text-xl lg:text-2xl hover:text-white/70"
              >
                ลงทะเบียนนิสิต
              </Link>
            </li>
          )}

          {/* รายวิชา */}
          <li className="relative group text-xl lg:text-2xl">
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "subject" ? null : "subject")
              }
              className="w-full text-left hover:text-white/70"
            >
              รายวิชา
            </button>
            <div onClick={() => {
              setDropdownOpen(null)
              setIsOpen(false)
              return
            }}
              className={`${dropdownOpen === "subject" ? "block" : "hidden"
                } lg:group-hover:block absolute top-6 left-5 bg-white text-gray-700 mt-2 rounded shadow-lg w-48 z-10`}
            >
              {subjectMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block text-xl px-4 py-2 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </li>

          {/* ล็อคเอาท์ */}
          <li>
            <button
              onClick={logOut}
              className="text-xl lg:text-2xl hover:text-white/70"
            >
              ล็อกเอาท์
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
