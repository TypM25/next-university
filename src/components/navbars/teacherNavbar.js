"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL_SEMESTER = `${process.env.NEXT_PUBLIC_API_URL}/teacher/check/semester`;

export default function TeacherNavbar() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [teacher, setTeacher] = useState(null);
  const [idSubject, setIdSubject] = useState();
  const [termId, setTermId] = useState("");
  const [isOpen, setIsOpen] = useState(false); // navbar mobile toggle
  const [dropdownOpen, setDropdownOpen] = useState(null); // dropdown toggle

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  async function checkSemester() {
    // เช็ค semester เก็บtermId
    try {
      const res = await axios.get(API_URL_SEMESTER);
      if (res.data.isOpen === true) {
        setTermId(res.data.data.term_id);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    }
  }

  async function fetchData() {
    // ดึงข้อมูล teacher
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teacher/find/byuser/${user.user_id}`
      );
      setTeacher(res.data.data);
      setIdSubject(res.data.data.subject_id)
    } catch (err) {
      if (err.response?.status === 404) {
        setTeacher(null);
        console.log("ยังไม่ได้ลงทะเบียนเป็นอาจารย์");
      } else {
        console.error("Error fetching teacher:", err);
      }
    }
  }

  useEffect(() => {
    checkSemester();
  },);

  useEffect(() => {
    if (user && user?.user_id) {
      console.log("fetch new..")
      fetchData();
    }
  }, [user]);

  const logOut = () => {
    AuthService.logout();
    router.push("/login");
  };



  return (
    <nav className="flex flex-col justify-between px-4 py-3 bg-black text-white rounded-lg md:flex-row">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between">
        <Link href="/teacher" className="text-3xl font-bold text-[#EEEEEE]">
          Teacher : {user.username || ""}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#EEEEEE] focus:outline-none" aria-label="Toggle menu">
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
              href="/teacher"
              className="block text-xl md:text-2xl hover:text-white/70"
            >
              หน้าหลัก
            </Link>
          </li>

          {!teacher && (
            <li>
              <Link
                href="/teacher/create"
                className="block text-xl md:text-2xl hover:text-white/70"
              >
                ลงทะเบียนอาจารย์
              </Link>
            </li>
          )}

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
              <ul>
                <li>
                  <Link
                    href="/teacher/subject"
                    className="block text-xl px-4 py-2 hover:bg-gray-100"
                  >
                    แก้ไขรายวิชา
                  </Link>
                </li>
                <li className=" hover:bg-gray-100">
                  <button
                    onClick={() => {
                      {
                        idSubject ?
                          router.push(`/teacher/student?subject_id=${idSubject}`)
                          :
                          console.log("Loading to student all page.")

                      }
                    }}
                    className="block text-xl px-4 py-2"
                  >
                    นิสิตทั้งหมด
                  </button>

                </li>
              </ul>
            </div>
          </li>

          <li>
            <button
              onClick={() => {
                {
                  idSubject && termId ?
                    router.push(`/teacher/grade/gradeAll?subject_id=${idSubject}&term_id=${termId}`)
                    :
                    console.log("Loading to grade all page.")
                }
              }}
              className="text-xl md:text-2xl hover:text-white/70"
            >
              เกรด
            </button>
          </li>

          <li>
            <button onClick={logOut} className="text-xl md:text-2xl hover:text-white/70">
              ล็อกเอาท์
            </button>
          </li>
        </ul>
      </div>
    </nav>

  );
}
