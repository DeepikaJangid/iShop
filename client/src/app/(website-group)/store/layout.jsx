import React from 'react'
import SideBar from "@/components/website/SideBar";
import Link from 'next/link';
import SwapSlider from "@/components/website/SwapSlider";

export default function layout({ children }) {
    const popularCategories = [
        { name: "iPhone (iOS)", quantity: "25 items", img: "iphone(ios).png" },
        { name: "Android", quantity: "40 items", img: "iphone(ios).png" },
        { name: "5G Support", quantity: "30 items", img: "iphone(ios).png" },
        { name: "Apple Tablets", quantity: "15 items", img: "iphone(ios).png" },
        { name: "Smartphone Chargers", quantity: "50 items", img: "iphone(ios).png" },
        { name: "Gaming", quantity: "20 items", img: "iphone(ios).png" },
        { name: "Xiaomi", quantity: "35 items", img: "iphone(ios).png" },
        { name: "Accessories", quantity: "45 items", img: "iphone(ios).png" },
        { name: "Samsung Tablets", quantity: "18 items", img: "iphone(ios).png" },
        { name: "eReader", quantity: "10 items", img: "iphone(ios).png" }
    ];

    return (
        <>
            <section className='w-full bg-white rounded-[10px] my-4'>
                <ul className='max-w-[1300px] m-auto text-[12px] md:text-[14px] text-[#999999] font-bold list-none flex items-center capitalize gap-x-2 p-5 md:py-6 md:px-6 lg:px-9'>
                    <Link href={"/"} className='hover:cursor-pointer'>home / </Link>
                    <li className='hover:cursor-pointer'> shop / </li>
                    <li className='hover:cursor-pointer text-black'> top cell phones & tablets</li>
                </ul>
            </section>
            {/* breadcrumb section */}

            <SwapSlider />
            {/* top phones and tablets section */}

            <section className='w-full bg-white rounded-[10px] my-4'>
                <section className='max-w-[1300px] m-auto p-5 md:py-6 md:px-6 lg:px-9'>
                    <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>popular categories</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ps-3 gap-10'>
                        {
                            popularCategories.map(
                                (data, idx) => {
                                    return (
                                        <div key={idx} className='flex max-w-[220px] justify-between'>
                                            <div className='flex flex-col justify-between py-0.5'>
                                                <b className='text-[12px] md:text-[14px] font-bold'>{data.name}</b>
                                                <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>{data.quantity}</p>
                                            </div>
                                            <img src={data.img} />
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </section>
            </section>
            {/* popular category section */}

            <section className="w-full bg-white rounded-[10px] my-4">
                <section className="max-w-[1300px] mx-auto p-5 md:py-6 md:px-6 lg:px-9 grid grid-cols-1 md:grid-cols-5 gap-x-7">
                    <aside className="md:col-span-2 lg:col-span-1">
                        <SideBar />
                    </aside>
                    <main className="md:col-span-3 lg:col-span-4">
                        {children}
                    </main>
                </section>
            </section>
        </>
    )
}
