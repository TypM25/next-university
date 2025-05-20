import React from 'react'

export default function Filter({ filter, handleDropdown, handleChange, handleCheckBox }) {
    return (
        <div className='w-full my-4 flex flex-col items-start self-start border border-amber-300'>
            <div className='flex items-center '>
                <select id="type" onChange={handleDropdown} className='w-fit min-w-8 py-1 px-4 mr-6 justify-center text-center rounded-lg bg-white/60
                lg: '>
                    {
                        Array.isArray(filter) && filter.length > 0 && filter.map((data, index) => (
                            <option key={index} value={data.value}>{data.name}</option>
                        ))
                    }
                </select>
                <label className='text-sm text-[#8E1616] mr-2 
                lg:text-lg'>
                ค้นหา :</label>
                <input id="search" onChange={handleChange} className='shadow-lg w-[50%] my-4 px-4 py-2 rounded-lg bg-white/70'></input>
            </div>

            <div>
                <form name="sort" onChange={handleCheckBox} defaultValue="ASC" className='flex justify-center items-center text-center border-rose-300'>
                    <input id="ASC" name="sort" type="radio" value="ASC" className='mr-2'></input>
                    <label htmlFor="ASC" name="sort" className='text-[#8E1616] mr-8'>น้อยไปมาก</label>
                    <input id="DESC" name="sort" type="radio" value="DESC" className='mr-2'></input>
                    <label htmlFor="DESC" name="sort" className='text-[#8E1616]'>มากไปน้อย</label>
                </form>
            </div>
        </div>
    )
}
