"use client"
import { Context } from '@/context/main-context';
import { axiosApiInstance, isValidPassword } from '@/helper/helper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify';

export default function register() {
    const router = useRouter()
    const { showPassword, togglePassword, showConfirmPassword, toggleConfirmPassword } = useContext(Context);

    const submitHandler = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        const data = {
            user_name: name,
            user_email: email,
            user_password: password,
        }

        if (name == "" || email == "" || password == "" || confirmPassword == "") {
            toast.warning("Please Fill All The Fields.");
        } else if (!isValidPassword(data.user_password)) {
            toast.warning("Password is not strong enough.");
            return;
        } else if (data.user_password !== confirmPassword) {
            toast.warning("Passwords Does Not Match.");
            return;
        }

        axiosApiInstance.post("/user/register", data).then(
            (response) => {
                if (response.data.flag === 0) {
                    toast.error(response.data.msg);
                }
                else if (response.data.flag === 1) {
                    toast.success(response.data.msg);
                    router.push("/");
                }
            }
        ).catch(
            (error) => {
                toast.error(error.data.message);
            }
        )
    }
    return (
        <>
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
                            <h2 className='text-[#01A49E] font-bold text-lg sm:text-xl md:text-2xl lg:text-[28px] capitalize mb-2 md:mb-4'>register</h2>
                            <p className='uppercase text-[#999999] tracking-widest text-[12px] md:text-[14px]'>join to us</p>

                            <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 '>
                                <p className='text-[12px] md:text-[14px] mb-2 capitalize'>your name</p>
                                <input
                                    className='outline-0 border border-[#CCCCCC] rounded-md p-2 capitalize w-full md:min-w-[510px] placeholder:text-[#999999] text-[12px] md:text-[14px] px-3'
                                    name="name"
                                    type="text"
                                    placeholder='Lorena Lalina Schuett' />
                            </div>
                            {/* name input */}

                            <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 '>
                                <p className='text-[12px] md:text-[14px] mb-2 capitalize'>email address</p>
                                <input className='outline-0 border border-[#CCCCCC] rounded-md p-2 w-full md:min-w-[510px] placeholder:text-[#999999] text-[12px] md:text-[14px] px-3'
                                    name='email'
                                    type="email"
                                    placeholder='MiuNatshaTaechamongkalapiwat@gmail.com' />
                            </div>
                            {/* email input */}

                            <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 '>
                                <p className='text-[12px] md:text-[14px] mb-2 capitalize'>password</p>
                                <div className='flex items-center justify-between border border-[#CCCCCC] rounded-md p-2 px-3 w-full md:min-w-[510px]'>
                                    <input className='outline-0 placeholder:text-[#999999] placeholder:capitalize text-[12px] md:text-[14px] w-full'
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        placeholder='password'
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className='hover:cursor-pointer'>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>
                            {/* password input */}

                            <div className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 '>
                                <p className='text-[12px] md:text-[14px] mb-2 capitalize'>confirm password</p>
                                <div className='flex items-center justify-between border border-[#CCCCCC] rounded-md p-2 px-3 w-full md:min-w-[510px]'>
                                    <input className='outline-0 placeholder:text-[#999999] placeholder:capitalize text-[12px] md:text-[14px] w-full'
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='confirmPassword'
                                        placeholder='confirm password' />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPassword}
                                        className='hover:cursor-pointer'>
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>
                            {/* confirm input */}

                            <button className='bg-[#01A49E] text-white font-medium uppercase text-[12px] md:text-[14px] rounded-md py-3 px-4 sm:px-6 md:px-8 mt-6 md:mt-10 active:bg-[#02d8d1] hover:cursor-pointer'>register</button>
                        </div>
                    </form>

                    <p className='text-[#999999] text-[12px] md:text-[13px] font-bold uppercase mt-2.5'>already user?
                        <Link href={"/login"} className='text-[#01A49E] hover:cursor-pointer uppercase'> login</Link >
                    </p>
                    {/* register right section */}
                </section>
            </section >
            {/* register section */}
        </>
    )
}
