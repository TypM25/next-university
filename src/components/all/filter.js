import React from 'react'

export default function Filter({ filter, handleChange}) {
    return (
        <div className='w-full my-4 flex flex-col items-start self-start '>
            <div className='flex items-center gap-5'>
                <select name="searchType" onChange={handleChange} className='w-fit min-w-8 py-1 px-4 justify-center text-center text-sm uppercase rounded-lg bg-white/60
                lg:text-lg '>
                    {
                        Array.isArray(filter) && filter.length > 0 && filter.map((data, index) => (
                            <option key={index} value={data.value} className='uppercase'>{data.name}</option>
                        ))
                    }
                </select>
                <label className='whitespace-nowrap text-sm text-[#8E1616] mr-2 
                lg:text-lg'>
                    ค้นหา : </label>
                <input name="searchData" onChange={handleChange} className='shadow-lg w-[50%] my-4 px-4 py-2 rounded-lg bg-white/70'></input>
            </div>

            <div>
                <form name="sort" onChange={handleChange}  className='flex justify-center items-center text-center border-rose-300'>
                    <input id="ASC" name="sort" type="radio" value="ASC" className='mr-2' defaultChecked/>
                    <label htmlFor="ASC" className='text-[#8E1616] mr-8'>น้อยไปมาก</label>

                    <input id="DESC" name="sort" type="radio" value="DESC" className='mr-2'  />
                    <label htmlFor="DESC" className='text-[#8E1616]'>มากไปน้อย</label>
                </form>
            </div>

            
        </div>
    )
}
