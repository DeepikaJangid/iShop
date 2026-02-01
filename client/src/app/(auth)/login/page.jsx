"use client"
import { Context } from '@/context/main-context';
import { axiosApiInstance } from '@/helper/helper';
import { setData } from '@/redux/reducers/UserReducer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function login() {
    const dispatcher = useDispatch();
    const router = useRouter()
    const { showPassword, togglePassword } = useContext(Context);

    const submitHandler = (event) => {
        event.preventDefault();

        const data = {
            user_email: event.target.email.value,
            user_password: event.target.password.value,
        }

        axiosApiInstance.post("/user/login", data).then(
            (response) => {
                if (response.data.flag === 1) {
                    toast.success(response.data.msg);
                    dispatcher(setData({ user: response.data.userData }))
                    router.push("/");
                } else if (response.data.flag === 0) {
                    toast.error(response.data.msg);
                }
            }
        ).catch(
            (error) => {
                console.log(error);
                toast.warning(error.data.message);
            }
        )
    }

    return (
        <>
            {/* breadcrumbs section */}
            {/* <section className='w-full md:min-w-[510px] bg-white rounded-[10px] my-4'>
                <ul className='max-w-[1300px] m-full md:min-w-[510px] text-[12px] md:text-[14px] text-[#999999] font-bold list-none flex items-center capitalize gap-x-2 p-5 md:py-6 md:px-6 lg:px-9'>
                    <Link href={"/"} className='hover:cursor-pointer'>home / </Link>
                    <li className='hover:cursor-pointer'> pages / </li>
                    <Link href={"/login"} className='hover:cursor-pointer text-black'> login</Link>
                </ul>
            </section> */}

            <section className='w-full min-h-screen md:min-w-[510px] bg-white flex items-center justify-center'>
                <section className='max-w-[1300px] shadow-2xl mx-auto rounded-2xl px-3 sm:px-5 lg:px-8 py-5 md:py-8 lg:py-12'>
                    <form
                        onSubmit={submitHandler}
                        className='flex-col lg:flex lg:flex-row justify-center lg:justify-around md:gap-10'>
                        <div className='hidden lg:flex'>
                            <img className='object-contain' src="../login.png" alt="" />
                        </div>
                        {/* register left section */}
                        <div className='px-4 sm:px-5 md:px-10 lg:px-0'>
                            <h2 className='text-[#01A49E] font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] capitalize mb-2 md:mb-4'>welcome back</h2>
                            <p className='uppercase text-[#999999] tracking-widest text-[12px] md:text-[14px]'>login in to continue</p>

                            <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 '>
                                <p className='text-[12px] md:text-[14px] mb-2 capitalize'>email address</p>
                                <input className='outline-0 border border-[#CCCCCC] rounded-md p-2 w-full md:min-w-[510px] placeholder:text-[#999999] text-[12px] md:text-[14px] px-3'
                                    name="email"
                                    type="email"
                                    placeholder='MiuNatshaTaechamongkalapiwat@gmail.com' />
                            </div>
                            {/* email input */}

                            <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 '>
                                <p className='text-[12px] md:text-[14px] mb-2 capitalize'>password</p>
                                <div className='flex items-center justify-between border border-[#CCCCCC] rounded-md p-2 px-3 w-full md:min-w-[510px]'>
                                    <input className='outline-0 placeholder:text-[#999999] placeholder:capitalize text-[12px] md:text-[14px] w-full'
                                        name='password'
                                        type={showPassword ? "text" : "password"}
                                        placeholder='password' />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className='hover:cursor-pointer'>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>
                            {/* password input */}

                            <button
                                type='submit'
                                className='bg-[#01A49E] text-white font-medium uppercase text-[12px] md:text-[14px] rounded-md py-3 px-4 sm:px-6 md:px-8 mt-6 md:mt-10 hover:cursor-pointer'>Login</button>
                        </div>
                        {/* register right section */}
                    </form>
                    <p className='text-[#999999] mt-4 text-[12px] md:text-[13px] font-bold uppercase'>new user?
                        <Link href={"/register"} className='text-[#01A49E] hover:cursor-pointer uppercase'> sign up</Link>
                    </p>
                </section>
            </section>
            {/* register section */}
        </>
    )
}
