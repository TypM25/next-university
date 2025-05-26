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
                    md:flex ">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-white uppercase bg-[#8E1616] text-center">
                            <tr>
                                {data && data.length > 0 ?
                                    Object.keys(data[0]).map((key, index) => (
                                        <th key={index} scope="col" className="p-2 text-sm md:text-lg md:px-6 md:py-3">
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
                                                className={`p-1 text-center text-sm md:text-xl md:px-6 md:py-4 ${idx % 2 === 0 ? "bg-white" : "bg-gray-200"}`}>
                                                {
                                                    value == null || value === "" ?
                                                        "-"
                                                        : typeof value === "boolean" ?
                                                            value ?
                                                                "True"
                                                                : "False"
                                                            : value
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={data && data.length > 0 ? Object.keys(data[0]).length : 1}
                                        className="px-6 py-6 text-center md:text-lg text-gray-600"
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
