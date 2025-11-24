import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

export default function SearchCategory() {
    return (
        <section className='w-full bg-[#01A49E] rounded-[10px]'>
            <section className='max-w-[1300px] m-auto flex items-center md:gap-x-8 md:justify-center lg:justify-evenly py-2.5 md:py-4  px-1.5 md:px-3 lg:px-7'>
                <div className='flex items-center gap-x-2 md:gap-x-4 bg-white rounded-full p-2.5 grow'>
                    <span className='flex items-center font-bold text-[12px] md:text-[13px] gap-x-2 md:gap-x-4 hover:cursor-pointer'>All Categories <FaAngleDown /></span>
                    <input type="text" placeholder='Search anything...' className='outline-0 text-[12px] md:text-[13px] grow' />
                    <IoSearch />
                </div>
                {/* search bar */}
                <span className='uppercase text-[12px] md:text-[13px] text-white font-medium hidden md:flex w-fit text-wrap'>free shipping over $199</span>
                <span className='uppercase text-[12px] md:text-[13px] text-white font-medium hidden md:flex w-fit text-wrap'>30 days money back</span>
                <span className='uppercase text-[12px] md:text-[13px] text-white font-medium hidden md:flex w-fit text-wrap'>100% secure payment</span>
            </section>
            {/* inner search category section */}
        </section>
        // search category section
    )
}
