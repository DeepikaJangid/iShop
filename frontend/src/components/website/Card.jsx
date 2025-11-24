import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

export default function Card() {
    return (
        <div className='flex flex-col w-[185px] relative'>
            <div className='uppercase text-[10px] rounded-md bg-[#01A49E] text-white w-fit py-1 px-2 absolute top-0 left-0'>save <br /><span className='font-semibold text-[12px] md:text-[14px] '>$199.0</span></div>
            <div className='bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 right-0'></div>
            <img src="BestSeller1.png" className='object-fit' />
            <span className='text-center text-[#666666] font-normal text-[12px] md:text-[13px]'>(8)</span>
            <span className='text-wrap text-[13px] md:text-[14px] font-bold mt-1 mb-2 md:mt-2.5 md:mb-3'>uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB</span>
            <p className='font-semibold text-red-500 text-[12px] md:text-[14px] lg:text-lg'>$1,729.00 <span className='text-[#666666] line-through text-[11px] md:text-[14px]'>$2,119.00</span></p>
            <span className='bg-[#f4fcf4] text-[#01A49E] uppercase text-[9px] md:text-[10px] font-medium w-fit rounded-md p-1 mt-1 mb-2 md:mt-2.5 md:mb-3'>free shipping</span>
            <span className='capitalize text-[10px] md:text-[12px] flex items-center gap-x-1.5'><FaCheckCircle className='bg-red-500 text-white rounded-full' />out of stock</span>
            <div className='flex items-center mt-2 md:mt-3'>
                <img className='h-10 w-10 p-1 object-contain' src="bestdeal1.png" alt="" />
                <img className='h-10 w-10 p-1 object-contain' src="bestdeal2.png" alt="" />
                <img className='h-10 w-10 p-1 object-contain' src="bestdeal3.png" alt="" />
            </div>
        </div>
    )
}
