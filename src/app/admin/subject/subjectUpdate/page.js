"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SubjectUpdate() {
    const [idSubject, setIdsubject] = useState("")
    const [data, setData] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [newSubjectName, setNewSubjectName] = useState("")
    const [credits, setCredits] = useState("")

    const [error, setError] = useState(false);
    const [errMes, setErrMes] = useState("")

    const update_data = {
        subject_name: newSubjectName,
        credits: credits
    }

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/find/subject/${idSubject}`;
    const API_URL_CREATE = `${process.env.NEXT_PUBLIC_API_URL}/admin/create/subject/${idSubject}`;
    const API_URL_DEL = `${process.env.NEXT_PUBLIC_API_URL}/admin/delete/subject/${idSubject}`;
    const API_URL_UPD = `${process.env.NEXT_PUBLIC_API_URL}/admin/update/subject/${idSubject}`;

    function setMode(e) {
        const id = e.target.id
        if (id === 'create') {
            setCreateMode(!createMode)
            setEditMode(false)
        } else if (id === 'edit') {
            setEditMode(!editMode)
            setCreateMode(false)
        }
    }

    function handleChange(e) {
        const id = e.target.id
        if (id === 'id') {
            setIdsubject(e.target.value)
        } else if (id === 'newSub') {
            setNewSubjectName(e.target.value)
        }
          else if (id === 'credits') {
            setCredits(e.target.value)
        }
    }




    async function clickConfirmEdit(e) {
        e.preventDefault();
        if (newSubjectName.trim() === '') {
            setError(true)
            setErrMes("กรุณากรอกชื่อรายวิชาใหม่")
            return;
        }

        try {
            const Link = createMode ? API_URL_CREATE : API_URL_UPD
            const response = createMode
                ? await axios.post(Link, update_data)
                : await axios.put(Link, update_data)

            setError(false)
            alert("ดำเนินการสำเร็จ")
        } catch (err) {
            setError(true)
            setErrMes(err.response?.data?.message)
        }
    }


    async function clickDelete() {
        if (idSubject === '') {
            setError(true)
            setErrMes("กรุณากรอกรหัสรายวิชาเพื่อลบ")
            return;
        }

        try {
            const response = await axios.delete(API_URL_DEL)
            setData('')
            setError(false)
            alert(response.data.message)
        } catch (err) {
            setError(true)
            setErrMes(err.response?.data?.message)
        }
    }


    useEffect(() => {
        async function clickFind() {
            if (!idSubject) return
            if (idSubject === '') {
                setError(true)
                setErrMes("กรุณากรอกรหัสนิสิต")
                return;
            }
            try {
                const response = await axios.get(API_URL)
                setData(response.data.data)
                setError(false)
                setErrMes("")
            } catch (error) {
                setError(true)
                setErrMes(error.response?.data?.message)
            }
        }
        clickFind()
        if (!idSubject) return;
    }, [idSubject])

    return (
       <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl lg:w-[50%]'>
  <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>แก้ไขรายวิชา</p>

  <div className='w-full flex flex-col items-center'>
    <div className='h-auto w-full flex flex-col gap-5 justify-center items-center md:items-start lg:flex-row lg:gap-10'>
      <p className='self-center text-lg font-semibold text-black/70'>รหัสวิชา :</p>
      <div>
        <input
          id='id'
          onChange={handleChange}
          className='px-4 w-full h-9 border-b border-black/30 rounded-none bg-transparent focus:outline-none'
        />
        {error && (
          <div
            className='flex self-start p-2 my-3 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
            role='alert'
          >
            <svg
              className='shrink-0 inline w-4 h-4 me-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
            </svg>

            <div>
              <span className='font-medium'>{errMes}</span>
            </div>
          </div>
        )}
      </div>
      {/* <button onClick={clickFind} className='w-20 py-2 h-full mx-3 font-bold text-black/70 rounded-full bg-gray-500 hover:bg-gray-600'>
          ค้นหา
        </button> */}
    </div>

    <div className='flex justify-center mt-7'>
      <button
        id='create'
        onClick={setMode}
        className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-green-600 hover:bg-green-700'
      >
        สร้าง
      </button>
      <button
        id='edit'
        onClick={setMode}
        className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-yellow-500 hover:bg-yellow-600'
      >
        แก้ไข
      </button>
      <button
        onClick={clickDelete}
        className='w-auto px-6 py-2 mx-3 font-bold text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]'
      >
        ลบ
      </button>
    </div>

    <div className='w-full h-full py-10 px-10 lg:px-30'>
      <div className='flex mb-7'>
        <p className='text-lg mr-3 text-black/70'>ชื่อวิชา : </p>
        <p className='self-center text-lg text-[#BB3E00]'>{data.subject_name}</p>
      </div>
    </div>

    {(editMode || createMode) && (
      <div className='flex flex-col p-5 w-[80%] bg-gray-100 rounded-lg lg:p-10'>
        <p className='mb-5 self-start font-semibold'>
          {editMode ? 'แก้ไขข้อมูลรายวิชา' : 'เพิ่มรายวิชา'}
        </p>
        <p className='self-start'>ชื่อรายวิชาใหม่</p>
        <input
          id='newSub'
          onChange={handleChange}
          className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light'
          type='text'
        />
        <p className='self-start'>หน่วยกิต</p>
        <input
          id='credits'
          onChange={handleChange}
          className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light'
          type='text'
        />
        <button
          onClick={clickConfirmEdit}
          className='self-center w-20 py-2 mx-3 font-bold text-black/70 rounded-full bg-gray-400 hover:bg-gray-500'
        >
          ยืนยัน
        </button>
      </div>
    )}
  </div>
</div>

    )
}
