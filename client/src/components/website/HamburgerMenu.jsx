"use client"
import React, { useContext, useEffect } from 'react'
import { HiBars3BottomRight } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { Context } from '@/context/main-context';

export default function HamburgerMenu() {
    // const [menu, setMenu] = React.useState(false);

    // const HamburgerMenuHandler = () => {
    //     setMenu(!menu);
    // }

    const { menu, HamburgerMenuHandler } = useContext(Context);

    useEffect(
        () => {
            if (menu == true) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = ""
            }
        }, [menu]
    )



    // function useBodyScrollLock(isLocked) {
    //     useEffect(() => {
    //         document.body.style.overflow = isLocked ? "hidden" : "";
    //         return () => (document.body.style.overflow = "");
    //     }, [isLocked]);
    // }
    // useBodyScrollLock(menu);



    // npm install body - scroll - lock
    // import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

    // useEffect(() => {
    //     const body = document.querySelector("body");
    //     if (menu) disableBodyScroll(body);
    //     else enableBodyScroll(body);
    // }, [menu]);






    return (
        <>
            <div className='relative md:hidden' onClick={HamburgerMenuHandler}>
                {
                    menu ?
                        <ImCross className='absolute -top-5.5 right-1.5' />
                        :
                        <HiBars3BottomRight className='text-[25px] absolute -top-6.5 right-0' />
                }

            </div>

            {/* mobile device menu list */}
            <div className={`w-[50%] shadow md:hidden fixed h-dvh top-15 bg-white p-4 rounded duration-700 transition-all ease-in-out ${menu ? 'right-0' : '-right-full'}`}>

                <ul className='flex flex-col gap-4'>
                    <li className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[12px]'>
                        homes <FaAngleDown className='text-[12px] ms-1' />
                    </li>
                    <li className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[12px]'>
                        pages <FaAngleDown className='text-[12px] ms-1' />
                    </li>
                    <li className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[12px]'>
                        products <FaAngleDown className='text-[12px] ms-1' />
                    </li>
                    <li className='flex items-center w-fit hover:cursor-pointer uppercase font-bold text-[12px]'>
                        contact
                    </li>
                </ul>
                {/* menu list */}

                <div className='uppercase tracking-wide mt-4'>
                    <p className='text-[9px] text-[#666666]'>welcome <br />
                        <span className='text-black hover:cursor-pointer font-bold text-[12px]'>log in / register</span>
                    </p>
                </div>
                {/* login */}

                <div className='flex items-center gap-x-2 mt-4'>

                    <div className='bg-[#EBEEF6] rounded-full h-10 w-10 flex items-center justify-center relative'>
                        <IoMdCart className='text-2xl text-[#01A49E]' />
                        <div className='bg-[#01A49E] h-[18px] w-[18px] rounded-full absolute -bottom-1 -right-1'><p className='mt-[1.5px] text-center text-white text-[11px]'>5</p></div>
                    </div>
                    <div className='uppercase tracking-wide'>
                        <p className='text-[9px] text-[#666666]'>cart <br />
                            <span className='text-black hover:cursor-pointer font-bold text-[12px]'>$1234.00</span>
                        </p>
                    </div>
                </div>
                {/* mobile device menu list */}
            </div >
            {/* lower header */}

        </>
    )
}
