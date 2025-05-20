"use client"

import { useState } from "react";
import LoadingMui from "../loadingMui";

export default function Table({ data }) {
    return (
        <>
            {Array.isArray(data) && data.length !== 0 ? (
                <table className="w-fit h-fit text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-white uppercase  bg-[#8E1616] text-center">
                        <tr>
                            {Object.keys(data[0]).map((key, index) => (
                                <th key={index} className="text-lg px-6 py-3">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ?
                            (data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 ">
                                    {Object.values(item).map((value, idx) => (
                                        <td key={idx} className="px-4 py-4 text-center text-xl text-gray-700 bg-white/60">
                                            {Array.isArray(value) && value.length > 0 ? (
                                                value.map((teacher, i) => (
                                                    <div key={i}>
                                                        {teacher.teacher_first_name} {teacher.teacher_last_name}
                                                    </div>
                                                ))
                                            ) : 
                                              (value === null || value.length === 0 ? "-" : value)}
                                        </td>
                                    ))}
                                </tr>
                            ))) : (
                                <LoadingMui />
                            )}
                    </tbody>
                </table>
            ) : (
                <p colSpan="4" className="px-6 py-6 text-center text-lg text-gray-400 ">
                    ไม่มีข้อมูลรายวิชา
                </p>
            )}
        </>
    );
}
