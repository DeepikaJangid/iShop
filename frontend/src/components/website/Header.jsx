import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import HamburgerMenu from './HamburgerMenu';
import { IoMdCart } from "react-icons/io";
import Link from 'next/link';

export default function Header() {
  return (
    // data - aos= "fade-down"
    <section className='w-full bg-white sticky shadow-lg top-0 rounded-[10px] z-50' >
      <section className='w-full lg:max-w-[1300px] m-auto p-3 md:py-5 md:px-10'>

        <div className='hidden md:flex items-center justify-between'>
          <div>
            <span className='bg-[#EBEEF6] text-black rounded-md ps-8 py-2 pe-2 text-[12px] font-normal'>Hotline 24/7</span>
            <span className='font-bold text-[12px] text-black ms-4'>(025) 3886 25 16</span>
          </div>
          {/* upper left header */}

          <div className='flex gap-x-3.5'>
            <ul className='flex items-center w-fit gap-x-3 me-3'>
              <li className='hover:cursor-pointer text-[14px]'>Sell on Swoo</li>
              <li className='hover:cursor-pointer text-[14px]'>Order Tracking</li>
            </ul>
            <select name="" id="" className='w-fit outline-0 border-0 hover:cursor-pointer -me-2 text-[14px]'>
              <option className='' value="USD">USD</option>
              <option value="IND">IND</option>
            </select>
            <div className='flex items-center w-fit hover:cursor-pointer  border-l border-[#d7dae3] ps-1'>
              <img className='w-[25px] h-[18px]' src="usa.png" alt="" />
              <span className='text-[14px]'>ENG</span> <FaAngleDown className='text-[12px] ms-1' />
            </div>
          </div>
          {/* upper right header */}

        </div>
        {/* uppar header */}

        <div className='md:mt-4 lg:mt-6 flex items-center justify-between'>

          <div className='flex md:gap-8 lg:gap-19'>
            <Link href='/' className="flex items-center gap-x-2 lg:gap-x-3">
              <div className='bg-[#01A49E] h-[35px] w-10 md:h-[49px] md:w-[55px] pb-1 flex items-center justify-center rounded-full'>
                {/* <img className='mt-2' src="Vector 1.png" alt="Logo" /> */}
                <span className='rounded-full h-[18px] w-[22px] border-b-2 border-white'></span>
              </div>
              {/* logo img */}
              <p className='font-bold text-[12px] tracking-wide md:text-[14px] leading-3.5 uppercase'>Swoo <br /> Tech Mart</p>
            </Link>
            {/* logo */}

            <ul className='hidden md:flex md:gap-x-4 lg:gap-x-8'>
              <Link href={"/"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                homes <FaAngleDown className='text-[12px] ms-1' />
              </Link>
              <Link href={"/pages"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                pages <FaAngleDown className='text-[12px] ms-1' />
              </Link>
              <Link href={"/store"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                products <FaAngleDown className='text-[12px] ms-1' />
              </Link>
              <Link href={"/contact"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                contact
              </Link>
            </ul>
            {/* menu list */}
          </div>
          {/* lower header left */}

          <div className='hidden md:flex md:gap-x-6 lg:gap-x-9 w-fit md:ms-6 lg:ms-0'>

            <div className='uppercase tracking-wide'>
              <p className='text-[11px] text-[#666666]'>welcome <br />
                <Link href={"/login"} className='text-black hover:cursor-pointer font-bold text-[14px]'>log in / register</Link>
              </p>
            </div>
            {/* login */}

            <div className='flex items-center gap-x-2'>

              <div className='bg-[#EBEEF6] rounded-full h-10 w-10 flex items-center justify-center relative'>
                <IoMdCart className='text-2xl text-[#01A49E]' />
                <div className='bg-[#01A49E] h-[18px] w-[18px] rounded-full absolute -bottom-1 -right-1'><p className='mt-[1.5px] text-center text-white text-[11px]'>5</p></div>
              </div>
              <div className='uppercase tracking-wide'>
                <p className='text-[11px] text-[#666666]'>cart <br />
                  <span className='text-black hover:cursor-pointer font-bold text-[14px]'>$1234.00</span>
                </p>
              </div>
            </div>
            {/* cart */}

          </div>
          {/* lower header right */}
        </div>


        <HamburgerMenu />
        {/* menu toggle */}


      </section >
      {/* inner header section */}
    </section >
    // header section
  )
}