// store page
import React from 'react'
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';

export default function Store() {
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

    const bestSellerCategories = [
        { name: "iPhone" },
        { name: "Samsung" },
        { name: "Xiaomi" },
        { name: "Asus" },
        { name: "Oppo" },
        { name: "Gaming Smartphones" },
        { name: "iPad" },
        { name: "Windows Tablets" },
        { name: "eReader" },
        { name: "Smartphone Chargers" },
        { name: "5G Support Smartphones" }
    ];

    const bestSellerProductDetails = [
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
    ];

    const brands = [
        { name: "Envato", logo: "https://cdn.worldvectorlogo.com/logos/envato-2.svg", itemCount: 1200 },
        { name: "CodeCanyon", logo: "codecanyon.jpg", itemCount: 850 },
        { name: "VideoHive", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThzKLuyt5Ord8a9263G5WLT-MlmQ3T8r2WHQ&s", itemCount: 640 },
        { name: "PhotoDune", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29PRD8UUKLGlCjXzQZZ12g7VEZM9SW6xUKQ&s", itemCount: 300 },
        { name: "Microlancer", logo: "https://logoeps.com/wp-content/uploads/2014/03/24508-microlancer-logo-envato-icon-vector-icon-vector-eps.png", itemCount: 150 }
    ];

    const byRatings = [
        { rating: 4.5, totalItems: 120 },
        { rating: 3.8, totalItems: 80 },
        { rating: 5.0, totalItems: 200 },
        { rating: 4.2, totalItems: 150 },
        { rating: 3.5, totalItems: 60 },
        { rating: 4.8, totalItems: 180 },
        { rating: 4.0, totalItems: 90 },
        { rating: 3.9, totalItems: 75 },
        { rating: 4.7, totalItems: 160 },
        { rating: 4.3, totalItems: 130 }
    ];

    const byMemory = [
        { size: "32GB", totalItems: 25 },
        { size: "16GB", totalItems: 40 },
        { size: "12GB", totalItems: 90 },
        { size: "8GB", totalItems: 180 },
        { size: "6GB", totalItems: 200 },
        { size: "4GB", totalItems: 120 },
        { size: "3GB", totalItems: 70 },
        { size: "2GB", totalItems: 50 },
    ];

    const byConditions = [
        { condition: "New", totalItems: 120 },
        { condition: "Like New", totalItems: 80 },
        { condition: "Open Box", totalItems: 30 }
    ];

    const products = [
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        },
        {
            name: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
            rating: 8,
            currentPrice: "$1,729.00",
            oldPrice: "$2,199.00",
            discount: "$59.00",
            shipping: "Free Shipping",
            stockStatus: "Out of Stock",
            img: "BestSeller1.png"
        }
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

            <section className='w-full bg-white rounded-[10px] my-4'>
                <section className='max-w-[1300px] m-auto p-5 md:py-6 md:px-6 lg:px-9'>
                    <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>top cell phones & tablets</h3>
                    <div className='flex-col flex lg:flex-row gap-3 lg:gap-x-2'>
                        <div className='max-h-[310px] rounded-[10px] overflow-hidden'>
                            <img src="3.png" alt="Slider" className='h-full w-full' />
                        </div>
                        <img src="banner1.png" alt="Banner" className='rounded-[10px] max-h-[310px] w-full lg:w-fit' />
                    </div>
                </section>
            </section>
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

            <section className='w-full bg-white rounded-[10px] my-4'>
                <section className='max-w-[1300px] mx-auto p-5 md:py-6 md:px-6 lg:px-9 grid grid-rows-1 md:grid-cols-5 md:gap-x-7'>
                    <aside className='bg-[#EEEFF6] rounded-[10px] p-5 row-span-1 md:col-span-2 lg:col-span-1 md:max-w-[300px] lg:w-auto'>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>categories</h3>
                        <button className='font-bold text-[11px] md:text-[12px] capitalize text-black bg-white py-2 md:py-3 ps-4 pe-2 md:ps-5 md:pe-3 lg:ps-7 lg:pe-4 text-center md:text-start rounded-lg w-full'>all categories</button>
                        <p className='font-bold text-[14px] md:text-md my-3 '>Cell Phones & Tablets</p>
                        <ul className='list-none font-normal text-[14px] md:text-md leading-[30px] px-3 md:px-5 gap-x-2 md:gap-0'>
                            <li className='text-red-500 hover:cursor-pointer'>All</li>
                            {
                                bestSellerCategories.map(
                                    (data, idx) => {
                                        return (
                                            <li key={idx} className='hover:cursor-pointer'>{data.name}</li>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </aside>
                    {/* bestseller categories aside*/}

                    <div className='row-span-1 md:col-span-3 lg:col-span-4 md:border-b border-[#CCCCCC] pb-3'>
                        <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase text-black mt-3 md:mt-0'>best sellers in this category</h3>
                        {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2'> */}
                        <div className='flex items-center justify-around flex-wrap gap-3 mt-3 sm:mt-4 md:mt-5 lg:mt-7'>

                            {
                                bestSellerProductDetails.map(
                                    (data, idx) => {
                                        return (
                                            <div key={idx} className='flex flex-col w-[185px] relative'>
                                                <div className='uppercase text-[10px] rounded-md bg-[#1ABA1A] text-white w-fit py-1 px-2 absolute top-0 left-0'>save <br /><span className='font-semibold text-[12px] md:text-[14px] '>{data.discount}</span></div>
                                                <div className='bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 right-0'></div>
                                                <img src={data.img} className='object-fit' />
                                                <span className='text-center text-[#666666] font-normal text-[12px] md:text-[13px]'>(8)</span>
                                                <span className='text-wrap text-[13px] md:text-[14px] font-bold mt-1 mb-2 md:mt-2.5 md:mb-3'>{data.name}</span>
                                                <p className='font-semibold text-red-500 text-[12px] md:text-[14px] lg:text-lg'>{data.currentPrice} <span className='text-[#666666] line-through text-[11px] md:text-[14px]'>{data.oldPrice}</span></p>
                                                <span className='bg-[#f4fcf4] text-[#1ABA1A] uppercase text-[9px] md:text-[10px] font-medium w-fit rounded-md p-1 mt-1 mb-2 md:mt-2.5 md:mb-3'>{data.shipping}</span>
                                                <span className='capitalize text-[10px] md:text-[12px] flex items-center gap-x-1.5'><FaCheckCircle className='bg-red-500 text-white rounded-full' />{data.stockStatus}</span>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        {/* cards div */}
                    </div>
                    {/* best seller in this category */}


                    {/* 2nd category section */}
                    <div className="row-span-1 md:col-span-2 lg:col-span-1 md:max-w-[300px] lg:max-w-auto">

                        <aside className='bg-[#EEEFF6] rounded-[10px] p-5 mt-3 md:mt-5 mb-3'>
                            <div className='flex-col lg:flex lg:flex-row justify-between mb-4'>
                                <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase text-black'>categories</h3>
                                <button className='capitalize text-[12px] md:text-[14px] hover:cursor-pointer'>reset all</button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                <button className='font-bold text-[11px] capitalize md:text-[12px] text-black bg-white py-2 px-3 md:px-4 text-center md:text-start rounded-md w-fit'>min: $45.00</button>
                                <button className='font-bold text-[11px] capitalize md:text-[12px] text-black bg-white py-2 px-3 md:px-4 text-center md:text-start rounded-md'>10.9 inch</button>
                                <button className='font-bold text-[11px] capitalize md:text-[12px] text-black bg-white px-3 md:px-4 text-center md:text-start rounded-md'>color: red</button>
                                <button className='font-bold text-[11px] md:text-[12px] text-black bg-white py-2 px-3 md:px-4 text-center md:text-start rounded-md'>128GB</button>
                            </div>

                            <p className='font-bold text-[12px] md:text-[14px] mb-3 mt-4'>By Brands</p>
                            <input type="text" className='outline-0 border border-[#99999933] bg-white py-1 mt-1 mb-4 md:mt-2 md:mb-7 w-full' />
                            <ul className='list-none font-normal text-[12px] md:text-[14px] leading-[30px] border-b border-[#99999933] pb-3.5 md:pb-5'>
                                {
                                    brands.map(
                                        (data, idx) => {
                                            return (
                                                <li key={idx} className='flex items-center gap-x-1.5'><input type="checkbox" /><img src={data.logo} height={25} width={25} />{data.name}</li>
                                            )
                                        }
                                    )
                                }
                            </ul>
                            {/* by brand */}

                            <p className='font-bold text-[12px] md:text-[14px] my-3 '>By Price</p>
                            <input type="range" min="0" max="10" className="w-full h-0.5 bg-[#1ABA1A] accent-[#1ABA1A] appearance-none range-thumb" />
                            <div className='flex-col lg:flex lg:flex-row items-center text-center lg:justify-between mt-3 mb-5 w-full'>
                                <p className='text-[10px] md:text-[12px] font-semibold bg-white p-3 rounded-[5px] hover:cursor-pointer'>$ 0</p>
                                ―
                                <p className='text-[10px] md:text-[12px] font-semibold rounded-[5px]  bg-white p-3 hover:cursor-pointer'>$ 10000</p>
                                <button className='bg-[#1ABA1A] p-3 text-10 md:text-[12px] rounded-[5px] text-white font-bold hover:cursor-pointer hover:bg-green-700 mt-2 md:ms-2 lg:mt-0'>Go</button>
                            </div>
                            {/* by price */}

                            <p className='font-bold text-[12px] md:text-[14px] my-3 border-t border-[#99999933] pt-4'>By Ratings</p>
                            {
                                byRatings.map(
                                    (data, idx) => {
                                        return (
                                            <li key={idx} className='flex items-center gap-x-1.5 font-normal text-[12px] md:text-[14px]'><input type="checkbox" />{data.rating} <span className='text-[11px] md:text-[12px] text-[#666]'>({data.totalItems})</span></li>
                                        )
                                    }
                                )
                            }
                            {/* by ratings */}


                            <p className='font-bold text-[12px] md:text-[14px] my-3 border-t border-[#99999933] pt-4'>By Screen Size</p>
                            <div className='flex flex-wrap gap-2'>
                                <button className='font-normal text-[12px] md:text-[13px] text-black bg-white p-2 text-center md:text-start rounded-md'>7" & Under</button>
                                <button className='font-normal text-[12px] md:text-[13px] text-black bg-white p-2 text-center md:text-start rounded-md'>7.1" - 8.9"</button>
                                <button className='font-normal text-[12px] md:text-[13px] text-black bg-white p-2 text-center md:text-start rounded-md'>9" - 10.9"</button>
                                <button className='font-normal text-[12px] md:text-[13px] text-black bg-white p-2 text-center md:text-start rounded-md'>11" & Greater"</button>
                            </div>
                            {/* by screen size */}

                            <p className='font-bold text-[12px] md:text-[14px] my-3 border-t border-[#99999933] pt-4'>By Memory</p>
                            {
                                byMemory.map(
                                    (data, idx) => {
                                        return (
                                            <li key={idx} className='flex items-center gap-x-2 font-normal text-[12px] md:text-[14px]'><input type="checkbox" />{data.size} <span className='text-[11px] md:text-[12px] text-[#666]'>({data.totalItems})</span></li>
                                        )
                                    }
                                )
                            }
                            {/* by ratings */}

                            <p className='font-bold text-[12px] md:text-[14px] my-3 border-t border-[#99999933] pt-4'>By Conditions</p>
                            {
                                byConditions.map(
                                    (data, idx) => {
                                        return (
                                            <li key={idx} className='flex items-center gap-x-2 font-normal text-[12px] md:text-[14px]'><input type="checkbox" />{data.condition} <span className='text-[11px] md:text-[12px] text-[#666]'>({data.totalItems})</span></li>
                                        )
                                    }
                                )
                            }
                            {/* by conditions */}

                            <div className='border-t border-[#99999933] mt-3 mb-1 md:mt-6 md:mb-2'></div>
                        </aside>
                        {/*categories products aside*/}

                        <img className='w-full' src="fced40a632755de37b7d28297825a7cd8e532834.png" alt="" />
                    </div>
                    {/* left side sections */}


                    {/* right section starts here */}
                    <div className='col-span-1 md:col-span-3 lg:col-span-4 pb-3 mt-4 md:mt-5 '>

                        <div className='md:flex items-center justify-between text-[12px] md:text-[14px] px-2'>
                            <span className='text-[#666666] md:text-start text-center'><b className='text-black'>1 - 40</b> of 120 results</span>
                            <div className='hidden lg:flex items-center gap-x-3'><span>Show Items</span><p className='bg-[#EEEFF6] rounded-[5px] py-2 px-3 font-bold flex items-center gap-x-3'><span>24</span> <span className='text-[#777777]'>48</span> <span className='text-[#777777]'>72</span> </p></div>
                            <div className='hidden lg:flex items-center gap-x-3'>Show Items<span className='bg-[#EEEFF6] rounded-[5px] py-2 px-4'>Default</span></div>
                            <span className='hidden md:flex text-[#666666]'>View As</span>

                        </div>

                        {/* YAHA PAR CHANGES HAI */}
                        <div className='flex items-center justify-center md:ps-5 lg:ps-0'>
                            <div className='m-0 grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-y-8 mt-3 sm:mt-4 md:mt-5 lg:mt-7 ms-5 text-center gap-4 md:space-x-18 lg:space-x-10'>
                                {
                                    products.slice(0, 6).map(
                                        (data, idx) => {
                                            return (
                                                <div key={idx} className='flex flex-col w-[185px] relative md:hidden'>
                                                    <div className='uppercase text-[10px] rounded-md bg-[#1ABA1A] text-white w-fit py-1 px-2 absolute top-0 left-0'>save <br /><span className='font-semibold text-[12px] md:text-[14px] '>{data.discount}</span></div>
                                                    <div className='bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 right-0'></div>
                                                    <img src={data.img} className='object-fit' />
                                                    <span className='text-center text-[#666666] font-normal text-[12px] md:text-[13px]'>(8)</span>
                                                    <span className='text-wrap text-[13px] md:text-[14px] font-bold mt-1 mb-2 md:mt-2.5 md:mb-3'>{data.name}</span>
                                                    <p className='font-semibold text-red-500 text-[12px] md:text-[14px] lg:text-lg'>{data.currentPrice} <span className='text-[#666666] line-through text-[11px] md:text-[14px]'>{data.oldPrice}</span></p>
                                                    <span className='bg-[#f4fcf4] text-[#1ABA1A] uppercase text-[9px] md:text-[10px] font-medium w-fit rounded-md p-1 mt-1 mb-2 md:mt-2.5 md:mb-3'>{data.shipping}</span>
                                                    <span className='capitalize text-[10px] md:text-[12px] flex items-center gap-x-1.5'><FaCheckCircle className='bg-red-500 text-white rounded-full' />{data.stockStatus}</span>
                                                </div>
                                            )
                                        }
                                    )
                                }
                                {/* for the small size */}

                                {
                                    products.map(
                                        (data, idx) => {
                                            return (
                                                <div key={idx} className='flex-col w-[185px] relative hidden md:flex'>
                                                    <div className='uppercase text-[10px] rounded-md bg-[#1ABA1A] text-white w-fit py-1 px-2 absolute top-0 left-0'>save <br /><span className='font-semibold text-[12px] md:text-[14px] '>{data.discount}</span></div>
                                                    <div className='bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 right-0'></div>
                                                    <img src={data.img} className='object-fit' />
                                                    <span className='text-center text-[#666666] font-normal text-[12px] md:text-[13px]'>(8)</span>
                                                    <span className='text-wrap text-[13px] md:text-[14px] font-bold mt-1 mb-2 md:mt-2.5 md:mb-3'>{data.name}</span>
                                                    <p className='font-semibold text-red-500 text-[12px] md:text-[14px] lg:text-lg'>{data.currentPrice} <span className='text-[#666666] line-through text-[11px] md:text-[14px]'>{data.oldPrice}</span></p>
                                                    <span className='bg-[#f4fcf4] text-[#1ABA1A] uppercase text-[9px] md:text-[10px] font-medium w-fit rounded-md p-1 mt-1 mb-2 md:mt-2.5 md:mb-3'>{data.shipping}</span>
                                                    <span className='capitalize text-[10px] md:text-[12px] flex items-center gap-x-1.5'><FaCheckCircle className='bg-red-500 text-white rounded-full' />{data.stockStatus}</span>
                                                </div>
                                            )
                                        }
                                    )
                                }
                                {/* from medium to larger sizes */}


                            </div>

                        </div>

                        {/* product cards */}
                        <div className="flex justify-center mt-4 md:mt-7 space-x-2">
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 hover:cursor-pointer" disabled>
                                Prev
                            </button>

                            <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer">1</button>
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:cursor-pointer">2</button>
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:cursor-pointer">3</button>
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:cursor-pointer">
                                Next
                            </button>
                        </div>

                    </div>
                    {/* product cards right div */}


                </section>
                {/*bestseller category longer container inner section */}
            </section >
            {/*bestseller category longer container section */}







        </>
    )
}
