"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EnrollemntUpdate() {
  const [term, setTerm] = useState("")
  const [termId, setTermId] = useState("")
  const [termName, setTermName] = useState("")
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")

  const [newTermId, setnewTermId] = useState("")


  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)
  //Error message box
  const [error, setError] = useState(false);
  const [errMes, setErrMes] = useState("")

  //ข้อมูลส่งเพื่ออัพเดท
  const update_data = {
    term_id: newTermId,
    term_name: termName,
    start_date: dateStart ? new Date(dateStart).toISOString() : null,
    end_date: dateEnd ? new Date(dateEnd).toISOString() : null
  }

  //กำหนดbox สร้าง/แก้ไข
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

  //แก้ไขเทอมการศึกษา
  async function clickConfirmEdit(e) {
    e.preventDefault();

    try {
      //สร้างเทอมการศึกษา
      const API_URL_CREATE = `${process.env.NEXT_PUBLIC_API_URL}/admin/create/semester`;
      //อัพเดทเทอมการศึกษา
      const API_URL_UPD = `${process.env.NEXT_PUBLIC_API_URL}/admin/update/semester`;
      const Link = createMode ? API_URL_CREATE : API_URL_UPD
      const response = createMode
        ? await axios.post(Link, { term_id: parseInt(newTermId), start_date: dateStart, end_date: dateEnd })
        : await axios.put(Link, { id: termId, ...update_data })

      setError(false)
      alert("สร้างเทอมการศึกษาสำเร็จ")
    } catch (err) {
      setError(true)
      setErrMes(err.response?.data?.message)
    }
  }

  //ลบเทอมการศึกษา
  async function clickDelete() {
    if (termId === '') {
      setError(true)
      setErrMes("กรุณากรอกรหัสรายวิชาเพื่อลบ")
      return;
    }

    try {
      //ลบเทอมการศึกษา
      const API_URL_DEL = `${process.env.NEXT_PUBLIC_API_URL}/admin/delete/semester`;
      const response = await axios.delete(API_URL_DEL, { data: { term_id: termId } })
      setTerm('')
      setError(false)
      alert(response.data.message)
    } catch (err) {
      setError(true)
      setErrMes(err.response?.data?.message)
    }
  }
  
  //ค้นหาเทอมการศึกษา
  async function clickFind() {
    if (!termId) return
    if (termId === '') {
      setError(true)
      setErrMes("กรุณากรอกรหัสเทอม")
      return;
    }
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/find/semester`;
      const response = await axios.post(API_URL, { term_id: termId })
      
      setTerm(response.data.data)
      // setnewTermId(response.data.data.term_id)
      // setTermName(response.data.data.term_name)
      // setDateStart(response.data.data.start_date)
      // setDateEnd(response.data.data.end_date)

      setError(false)
      setErrMes("")
    } catch (error) {
      setError(true)
      setErrMes(error.response?.data?.message)
    }
  }

  useEffect(() => {
    clickFind()
    if (!termId) return;
  }, [termId])

  return (
    <div className='w-[70%] h-[50%] px-4 flex flex-col justify-center items-center rounded-3xl lg:w-[50%]'>
      <p className='flex flex-col items-center text-2xl font-bold mb-10 text-[#8E1616]'>เทอมการศึกษา</p>

      <div className='w-full flex flex-col items-center'>
        <div className='h-auto w-full flex flex-col gap-5 justify-center items-center text-center lg:flex-row lg:gap-10'>
          <p className='self-center text-lg font-semibold text-black/70'>รหัสเทอม :</p>
          <div>
            <input id='term_id' onChange={(e) => setTermId(e.target.value)} className='px-4 w-full h-9 border-b' />
            {error && (
              <div
                className='flex self-start p-2 my-3 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
                role='alert'>
                <svg className="shrink-0 inline w-4 h-4 me-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                  <span className="font-medium">{errMes}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-center mt-7'>
          <button id="create" onClick={setMode} className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-green-600 hover:bg-green-700'>สร้าง</button>
          <button id="edit" onClick={setMode} className='w-auto px-4 py-2 mx-3 font-bold text-white rounded-full bg-yellow-500 hover:bg-yellow-600'>แก้ไข</button>
          <button onClick={clickDelete} className='w-auto px-6 py-2 mx-3 font-bold text-white rounded-full bg-[#A31D1D] hover:bg-[#D84040]'>ลบ</button>
        </div>

        <div className='w-full h-full py-10 px-10 lg:px-30'>
          <div className='flex mb-7'>
            <p className='text-lg mr-3 text-black/70'>ชื่อเทอม : </p>
            <p className='self-center text-lg text-[#BB3E00]'>{term.term_name}</p>
          </div>
        </div>

        {(editMode || createMode) && (
          <div className='flex flex-col p-5 w-[80%] bg-gray-100 rounded-lg lg:p-10'>
            <p className='mb-5 self-start font-semibold'>
              {editMode ? "แก้ไขเทอมการศึกษา" : "เทอมการศึกษาใหม่"}
            </p>

            <p className='self-start mt-5'>รหัสเทอมใหม่</p>
            <input id='new_term_id'  onChange={(e) => setnewTermId(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text' />

            {editMode && (
              <>
                <p className='self-start mt-5'>ชื่อเทอมการศึกษาใหม่</p>
                <input id='term_name' onChange={(e) => setTermName(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='text' />
              </>
            )}

            <p className='self-start mt-5'>วันเริ่มลงทะเบียน</p>
            <input id='date_start' onChange={(e) => setDateStart(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='datetime-local' step="1" />

            <p className='self-start mt-5'>วันปิดลงทะเบียน</p>
            <input id='date_end' onChange={(e) => setDateEnd(e.target.value)} className='w-full my-4 py-2 px-4 rounded-full bg-gray-200 font-light' type='datetime-local' step="1" />

            <button onClick={clickConfirmEdit} className='self-center w-20 py-2 mx-3 font-bold text-black/70 rounded-full bg-gray-400 hover:bg-gray-500'>
              ยืนยัน
            </button>
          </div>
        )}
      </div>
    </div>

  )
}

