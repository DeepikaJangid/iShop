'use client'
import React, { useEffect } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import HamburgerMenu from './HamburgerMenu';
import { IoMdCart } from "react-icons/io";
import Link from 'next/link';
import { getCategories } from "@/api-calls/category";
import { useDispatch, useSelector } from 'react-redux';
import { logout, lstoUser } from '@/redux/reducers/UserReducer';
import { emptyCart, lsToCart } from '@/redux/reducers/CartReducer';
import { useSearchParams } from 'next/navigation';
import { formatPriceINR } from '@/helper/helper';
// import { setData as setCategoryData } from '@/redux/reducers/CategoryReducer';
// as means alias --> alias mtlab ki is page par setData ko kis naam se jana jayega

export default function Header() {
  const searchParams = useSearchParams();
  const dispatcher = useDispatch();

  // const fetchCategory = async () => {
  //   const categoriesDataJSON = await getCategories();
  //   dispatcher(setCategoryData(
  //     { data: categoriesDataJSON.categories, imageURL: categoriesDataJSON.imageURL }));
  //   //set data ko dispatcher call karega //(data: categoriesDataJSON.categories) payload hai

  // }

  // useEffect(
  //   () => {
  //     fetchCategory();
  //   }, []
  // )

  const currentSortBy = Number(searchParams.get('sortby')) || 1; //if there is new sortby or limit values in the url after the first render of the store page. if there is new value show the new filter's values data if not then show sortby=1&limit=4 by default.
  const currentLimit = Number(searchParams.get('limit')) || 8;
  const cart = useSelector(store => store.cart);
  // useSelector lets a React component read data from the Redux store. When the data changes, the component automatically re-renders.
  useEffect(
    () => {
      dispatcher(lstoUser());
      dispatcher(lsToCart());
    }, []
  )

  const logoutHandler = () => {
    dispatcher(logout());
    dispatcher(emptyCart());
  }

  const user = useSelector((state) => state.user.data);
  return (
    // data - aos= "fade-down"
    <section className='w-full bg-white sticky shadow-lg top-0 rounded-[10px] z-50' >
      <section className='w-full lg:max-w-[1300px] m-auto p-3 md:py-5 md:px-10'>

        <div className='hidden md:flex items-center justify-between'>
          <div>
            <span className='bg-[#EBEEF6] text-black rounded-md ps-8 py-2 pe-2 text-[12px] font-normal'>Hotline 24/7</span>
            <span className='font-bold text-[12px] text-black ms-4'>1234567890</span>
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
              <Link href={"/page"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                Pages <FaAngleDown className='text-[12px] ms-1' />
              </Link>
              <Link href={`/store?sortby=${currentSortBy}&limit=${currentLimit}`} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                Store <FaAngleDown className='text-[12px] ms-1' />
              </Link>
              <Link href={"/product"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                products <FaAngleDown className='text-[12px] ms-1' />
              </Link>
              <Link href={"/contact"} className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[14px]'>
                contact
              </Link>
            </ul>
            {/* menu list */}
          </div>
          {/* lower header left */}

          <div className='hidden md:flex md:gap-x-6 lg:gap-x-9 w-fit md:ms-6 lg:ms-0 tracking-wide'>

            <p className='mt-1 flex flex-col text-[13px] font-semibold text-[#000000] hover:cursor-pointer'>{user ? <Link href={"/profile"} className='hover:text-[#01A49E]'>{user.name}</Link> : "Welcome"}
              {
                user == null
                  ?
                  <Link href={"/login?redirect=/"} className='text-black hover:cursor-pointer font-bold text-[14px]'>Log In / Register</Link>
                  :
                  <button
                    onClick={logoutHandler}
                    className='text-[12px] text-[#666666] hover:cursor-pointer ml-auto hover:text-[#01a49f6a]'>
                    Logout
                  </button>
              }
            </p>
            {/* login */}

            <Link href={'/cart'} className='flex items-center gap-x-2'>
              <div className='bg-[#EBEEF6] rounded-full h-10 w-10 flex items-center justify-center relative'>
                <IoMdCart className='text-2xl text-[#01A49E]' />
                <div className='bg-[#01A49E] h-[18px] w-[18px] rounded-full absolute -bottom-1 -right-1'><p className='mt-[1.5px] text-center text-white text-[11px]'>{cart?.data?.length}</p></div>
              </div>
              <div className='uppercase tracking-wide'>
                <p className='text-[11px] text-[#666666]'>cart <br />
                  <span className='text-black hover:cursor-pointer font-bold text-[14px]'>₹ {formatPriceINR(cart?.final_total)} </span> <br />
                  <del className='text-gray-500 hover:cursor-pointer font-bold text-[14px]'>₹ {formatPriceINR(cart?.original_total)}</del>
                </p>
              </div>
            </Link>
            {/* cart */}

          </div>
          {/* lower header right */}

          <HamburgerMenu />
          {/* menu toggle */}

        </div>
      </section >
      {/* inner header section */}
    </section >
  )
}