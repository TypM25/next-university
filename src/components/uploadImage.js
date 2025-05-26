"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function UploadImage({ API_URL_IMAGE, API_URL_UPLOAD }) {
    const [file, setFile] = useState(null);
    const [imageList, setImageList] = useState([]);

    async function handleFileChange(e) {
        setFile(e.target.files[0]);
    };


    async function submitImage() {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(API_URL_UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.message)
            await fetchData();
        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    async function fetchData() {
        try {
            const response = await axios.post(API_URL_IMAGE)
            setImageList(response.data.data)
        }
        catch (err) {
            console.log(err.response.data.message)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='flex flex-col justify-center items-center gap-6 w-fit'>
            {/* {imageList?.length > 0 &&
                (imageList.map((data, index) =>
                    <img key={index} src={`${process.env.NEXT_PUBLIC_API_URL}${data.url}`} className='w-[30%]' />
                ))} */}
            {imageList ?
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${imageList.url}`} className='w-50 h-50 rounded-full object-cover md:w-60 md:h-60'/>
                : <img src="/img/guest1.png" className='w-60 h-60 rounded-full object-cover' />}
            <div className='flex justify-center items-center gap-4'>
                <div className="">
                    <label htmlFor="fileInput" className="cursor-pointer inline-block bg-[#E5D0AC] text-white px-4 py-2 rounded text-sm hover:bg-[#d0b68c]">
                        📁 กรุณาเลือกไฟล์
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                <button onClick={submitImage} className='font-semibold text-rose-700'>Upload</button>
            </div>

        </div>
    )
}
