import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className='w-full bg-white rounded-[10px]'>
            <section className='w-full lg:max-w-[1300px] m-auto pt-7 md:pt-10 lg:pt-15 px-5 md:px-4'>
                <div className='flex-col md:flex-row md:flex md:gap-x-5 justify-evenly'>
                    <div className=''>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-5 md:mb-7'>Swoo - 1st NYC tech online market</h3>
                        <p className='font-normal text-[11px] md:text-[14px] uppercase md:mb-1'>hotline 24/7</p>
                        <p className='font-bold text-[15px] md:text-3xl text-[#E15E43] mb-5 md:mb-7'>(025) 3686 25 16</p>
                        <span className='font-normal text-[12px] md:text-[14px] leading-6'>257 Thatcher Road St, Brooklyn, Manhattan, <br />
                            NY 10092</span>
                        <p className='font-normal text-[12px] md:text-[14px]'>contact@Swootechmart.com</p>

                        <div className='flex mt-4 md:mt-7 gap-x-3.5'>
                            <div className='bg-[#E1E3EB] flex items-center justify-center h-[35px] w-[35px] rounded-full hover:cursor-pointer'><FaTwitter /></div>
                            <div className='bg-[#E1E3EB] flex items-center justify-center h-[35px] w-[35px] rounded-full hover:cursor-pointer'><FaFacebookF /></div>
                            <div className='bg-[#E1E3EB] flex items-center justify-center h-[35px] w-[35px] rounded-full hover:cursor-pointer'><FaInstagram /></div>
                            <div className='bg-[#E1E3EB] flex items-center justify-center h-[35px] w-[35px] rounded-full hover:cursor-pointer'><FaYoutube /></div>
                            <div className='bg-[#E1E3EB] flex items-center justify-center h-[35px] w-[35px] rounded-full hover:cursor-pointer'><FaPinterest /></div>
                        </div>
                    </div>
                    {/* header - contact */}

                    <p className=' border-b border-[#e9e8e8] my-4'></p>

                    <ul className='list-none text-[12px] md:text-[14px] text-[#666666]'>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>top categories</h3>
                        <li className='leading-7'>Laptops</li>
                        <li className='leading-7'>PC & Computers</li>
                        <li className='leading-7'>Cell Phones</li>
                        <li className='leading-7'>Tablets</li>
                        <li className='leading-7'>Gaming & VR</li>
                        <li className='leading-7'>Networks</li>
                        <li className='leading-7'>Cameras</li>
                        <li className='leading-7'>Sounds</li>
                        <li className='leading-7'>Office</li>
                    </ul>
                    {/* top categories */}

                    <p className=' border-b border-[#e9e8e8] my-4'></p>

                    <ul className='list-none text-[12px] md:text-[14px] text-[#666666]'>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>company</h3>
                        <li className='leading-7'>About Swoo</li>
                        <li className='leading-7'>Contact</li>
                        <li className='leading-7'>Career</li>
                        <li className='leading-7'>Blog</li>
                        <li className='leading-7'>Sitemap</li>
                        <li className='leading-7'>Store Locations</li>
                    </ul>
                    {/* company */}

                    <p className=' border-b border-[#e9e8e8] my-4'></p>

                    <ul className='list-none text-[12px] md:text-[14px] text-[#666666]'>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>help center</h3>
                        <li className='leading-7'>Customer Service</li>
                        <li className='leading-7'>Policy</li>
                        <li className='leading-7'>Terms & Conditions</li>
                        <li className='leading-7'>Track Order</li>
                        <li className='leading-7'>FAQs</li>
                        <li className='leading-7'>My Account</li>
                        <li className='leading-7'>Product Support</li>
                    </ul>
                    {/* help center */}

                    <p className=' border-b border-[#e9e8e8] my-4'></p>

                    <ul className='list-none text-[12px] md:text-[14px] text-[#666666]'>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>partner</h3>
                        <li className='leading-7'>Become Seller</li>
                        <li className='leading-7'>Affiliate</li>
                        <li className='leading-7'>Advertise</li>
                        <li className='leading-7'>Partnership</li>
                    </ul>
                    {/* partner */}
                </div>
                {/* footer first section */}

                <div className='flex-col md:flex md:flex-row mt-6 md:mt-15 justify-between'>
                    <div className='flex gap-x-5 lg:ms-7 h-11'>
                        <select name="" id="" className='w-fit outline-0 border rounded-lg border-[#9999993d] hover:cursor-pointer -me-2 text-[12px] md:text-[14px] ps-5 pe-1'>
                            <option className='' value="USD">USD</option>
                            <option value="IND">IND</option>
                        </select>
                        <div className='flex items-center w-fit hover:cursor-pointer border rounded-lg border-[#9999993d] py-2 px-3'>
                            <img className='w-5 h-[15px]' src="usa.png" alt="" />
                            <span className='text-[12px] md:text-[14px]'>ENG</span> <FaAngleDown className='text-[12px] ms-1' />
                        </div>
                    </div>
                    {/* language section */}

                    <div className=''>
                        <h1 className='uppercase font-bold text-[14px] md:text-lg mt-4 mb-3 md:my-0'>subscribe & get <span className='text-[#E15E43]'> 10% off </span> for your first order</h1>

                        <div className='flex text-[12px] md:text-[14px] lg:w-[783px] pb-2 px-3 md:px-8 my-4 lg:mt-7 gap-x-2 border-b border-[#CCCCCC]'>
                            <input type="text" placeholder='Enter your email address' className='grow text-[#757575] text-[12px] md:text-[14px]' />
                            <button className='uppercase text-[#E15E43] font-bold hover:cursor-pointer'>susbcribe</button>
                        </div>
                        <i className='text-[12px] md:text-[11px] text-[#666666]'>By subscribing, you’re accepted our <a className='underline text-black hover:cursor-pointer'>Policy</a></i>
                    </div>

                </div>
                {/* footer second section */}

                <div className='flex-col md:flex-row flex border-t border-[#CCCCCC] mt-7 py-4 md:mt-10 md:py-7 md:items-center justify-between'>
                    <p className='text-[12px] md:text-[14px]'>© 2024 <b>Shawonetc3</b> . All Rights Reserved</p>
                    <div className='flex w-fit gap-x-3 md:gap-x-4 items-center my-4'>
                        <img src="pay1.png" alt="paypal" />
                        <img src="pay2.png" alt="mastercard" />
                        <img src="pay3.png" alt="visa" />
                        <img src="pay4.png" alt="stripe" />
                        <img src="pay5.png" alt="klarna" />
                    </div>
                    <button className='text-[#0D6EFD] text-[12px] md:text-[14px] w-fit hover:cursor-pointer'>Mobile Site</button>
                </div>
                {/* footer last section */}

            </section>
            {/* header inner section */}
        </section>
        // footer section
    )
}
