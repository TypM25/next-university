"use client"

import { useState } from "react";
import LoadingMui from "../loadingMui";

export default function Table({ isLoading, data }) {
    return (
        <>
            {isLoading ? (
                <LoadingMui />
            ) : (

                <div className="w-auto h-auto overflow-x-auto max-w-full max-h-[400px] 
                    lg:flex ">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-white uppercase bg-[#8E1616] text-center">
                            <tr>
                                {data && data.length > 0 ?
                                    Object.keys(data[0]).map((key, index) => (
                                        <th key={index} scope="col" className="p-2 text-sm lg:text-lg lg:px-6 lg:py-3">
                                            {key}
                                        </th>
                                    )) : null}
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-300">
                                        {Object.values(item).map((value, idx) => (
                                            <td
                                                key={idx}
                                                className={`p-1 text-center text-sm lg:text-xl lg:px-6 lg:py-4 ${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}`}>
                                                {
                                                    value == null || value === "" ? //ถ้าvalue = null ให้เเสดง "-"
                                                        "-"
                                                        : typeof value === "boolean" ?//ถ้าvalue != null เข็คbooleanถ้าใช่ เเล้วTruthyเเสดงtrue 
                                                            value ?
                                                                "True"
                                                                : "False"
                                                            : value //ถ้า value != booleanเเสดงค่า
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={data && data.length > 0 ? Object.keys(data[0]).length : 1}
                                        className="px-6 py-6 text-center lg:text-lg text-gray-600"
                                    >
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>

    );
}
