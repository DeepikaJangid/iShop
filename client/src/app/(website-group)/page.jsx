import React from 'react'
import Card from '@/components/website/Card';
import { FiSend } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getCategories } from "@/api-calls/category";
import { getBrands } from '@/api-calls/brand';
import { getProducts } from '@/api-calls/product';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export const metadata = {
  title: "Home Page - iSHop",
  description: "Home Page - Swoo Tech Mart",
};

// const featuredBrands = [
//   {
//     id: 1,
//     img: "brands1.png",
//   },
//   {
//     id: 2,
//     img: "brands2.png",
//   },
//   {
//     id: 3,
//     img: "brands3.png",
//   },
//   {
//     id: 4,
//     img: "brands4.png",
//   },
//   {
//     id: 5,
//     img: "brands5.png",
//   },
//   {
//     id: 6,
//     img: "brands6.png",
//   },
//   {
//     id: 7,
//     img: "brands7.png",
//   },
//   {
//     id: 8,
//     img: "brands8.png",
//   },
//   {
//     id: 9,
//     img: "brands9.png",
//   },
//   {
//     id: 10,
//     img: "brands10.png",
//   },
// ];


export default async function page() {
  const baseQuery = { status: true };
  const fetchCategories = (type, limit) => getCategories({
    ...baseQuery,
    [type]: true,
    ...(limit > 0 && { limit })
  });
  const fetchBrands = (type, limit) => getBrands({
    ...baseQuery,
    [type]: true,
    ...(limit > 0 && { limit })
  });
  const fetchProducts = (type, limit) => getProducts({
    ...baseQuery,
    [type]: true,
    ...(limit > 0 && { limit })
  })
  const homeCategoryJSON = await fetchCategories("home", 5); //jiska home true hai and jiska status true hai woh show karwana hai
  const topCategoryJSON = await fetchCategories("top", 4);
  const bestBrandsJSON = await fetchBrands("best", 10);
  const bestSellerProductsJSON = await fetchProducts("best", 5);
  const bestProducts = bestSellerProductsJSON.products.filter(
    (product) =>
      product.is_best &&
      (product.category_id.name === "Laptop" || product.category_id.name === "Computer")
  );
  const topProductsJSON = await fetchProducts("top", 20);
  const topProducts = topProductsJSON.products.filter(
    (product) =>
      product.is_top &&
      (product.category_id.name === "Mobile Phone" || product.category_id.name === "Tablet")
  );

  return (
    <>
      <section className='w-full rounded-[10px] my-4'>
        <section className='max-w-[1300px] mx-auto flex-col lg:flex lg:flex-row lg:space-x-5 space-y-5 justify-center '>
          <div className='border bg-white border-[#ECECEC] rounded-[15px] p-4 md:p-5 lg:p-7'>
            <h3 className='font-bold text-md md:text-lg lg:text-xl capitalize mb-5 text-black border-b border-[#ECECEC] pb-3.5'>category</h3>
            <ul className='list-none flex flex-col gap-4 md:mt-7'>
              {
                homeCategoryJSON?.categories?.slice(0, 6).map(
                  (data, idx) => {
                    return (
                      <li key={idx} className='flex items-center justify-between border border-[#F2F3F4] rounded-[5px] lg:w-[236px] p-3 hover:cursor-pointer'>
                        <img
                          src={homeCategoryJSON.imageURL + data.image_name}
                          className='text-[#01A49E78] text-[24px] h-7 w-9 object-fill' />
                        <Link href={`/store/${data.slug}`} >{data.name}</Link>
                        <span className='bg-[#01A49E78] h-6 w-6 rounded-full flex items-center justify-center text-white font-normal text-[11px] md:text-[13px]'>{data.productCount}</span>
                      </li>
                    )
                  }
                )
              }
            </ul>
          </div>
          {/* home banner category */}

          <div className='hidden lg:flex rounded-[30px] border border-black w-[969px] h-[456px] overflow-hidden'>
            {/* <img className='object-cover w-full h-full' src="home-banner.png" /> */}
            <div className='relative bg-[url(/homebanner.png)] w-full h-full bg-(image: cover) text-white flex flex-col ps-4 sm:ps-6 md:ps-12 lg:ps-20 justify-center'>
              <h1 className='text-[72px] font-bold leading-[72px] w-fit'>Don't miss amazing <br /> deals</h1>
              <h3 className='text-[30px] font-normal w-fit mt-5 mb-4 md:mt-7 md:mb-9'>Sign up for the daily newsletter </h3>
              <div className='flex items-center border border-[#9A9A9A] rounded-full w-fit'>
                <FiSend className='ms-4 md:ms-7 me-3 md:me-4 h-[22px] w-[22px]' />
                <input className='outline-0 placeholder:text-white' type="text" placeholder='Your email address' />
                <button className='px-3 py-2 md:px-6 md:py-4 bg-[#01A49E] font-medium text-[14px] md:text-[16px] rounded-full hover:cursor-pointer'>Subscribe</button>
              </div>
            </div>
          </div>
          {/* home banner div ends here */}
        </section>
      </section>
      {/* home category and banner section ends here */}

      <section className='w-full rounded-[10px] my-4'>
        <section className='max-w-[1300px] mx-auto flex-col lg:flex lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 items-center'>
          <div className='w-full bg-white rounded-[10px] p-3 md:py-5 md:px-7 '>
            <div className='text-[14px] md:text-[16px] lg:text-[18px] uppercase font-bold flex items-center justify-between mb-3 md:mb-5'>
              best brands
              <Link href={"/store"}
                className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
            </div>
            {/* <div className='flex justify-center sm:flex-col'> */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
              {
                bestBrandsJSON?.brands?.map(
                  (data, _) => {
                    return (
                      <div key={data._id} className='flex flex-col items-center justify-center w-full'>
                        <img
                          src={bestBrandsJSON.imageURL + data.image_name}
                          className='text-[#01A49E78] text-[24px] h-9 w-13 object-fill' />
                        <Link href={`/store/brand/${data.slug}`}
                          className='mt-1.5 text-[12px] md:text-[14px] font-medium'>{data.name}</Link>
                      </div>
                    )
                  }
                )
              }
            </div>
            {/* </div> */}
            {/* dive for flex */}
          </div>
          {/* feature brands */}

          <div className='w-full lg:h-[210px] bg-white rounded-[10px] p-3 md:p-5 lg:p-7'>
            <div className='text-[14px] md:text-[16px] lg:text-[18px] uppercase font-bold flex items-center justify-between mb-3 md:mb-5 lg:mb-7'>
              top categories
              <Link href={"/store"}
                className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-8'>
              {
                topCategoryJSON?.categories?.map(
                  (data, idx) => {
                    return (
                      <div key={idx} className='flex flex-col items-center justify-center w-full'>
                        <img
                          src={topCategoryJSON.imageURL + data.image_name}
                          className='text-[#01A49E78] text-[24px] h-15 w-18 object-fill' />
                        <Link href={`/store/${data.slug}`}
                          className='mt-3.5 text-[12px] md:text-[14px] font-semibold'>{data.name}</Link>
                      </div>

                    )
                  }
                )
              }
            </div>
          </div>
          {/* top categories */}
        </section>
      </section >
      {/* feature brands and top categories section */}

      < section className='w-full rounded-[10px] my-4' >
        <section className='max-w-[1300px] mx-auto flex-col lg:space-x-5 space-y-5 items-center justify-center '>

          <section className='lg:flex lg:flex-row lg:justify-between'>
            <div className=''>
              <h2 className='uppercase font-bold text-[14px] md:text-[16px] lg:text-[18px] px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 bg-[#01A49E] text-white rounded-[10px]'>deals of the day</h2>

              <div className='flex-col md:flex md:flex-row md:justify-around bg-white md:px-5 lg:px-10 md:py-7 lg:py-12 rounded-[10px]'>
                <div className='flex justify-around p-4'>
                  <div className='space-y-2 md:space-y-4'>
                    <img className='h-[60px] w-[35px] object-contain' src="bestdeal1.png" alt="" />
                    <img className='h-[60px] w-[35px] object-contain' src="bestdeal2.png" alt="" />
                    <img className='h-[60px] w-[35px] object-contain' src="bestdeal3.png" alt="" />
                    <img className='h-[60px] w-[35px] object-contain' src="bestdeal4.png" alt="" />
                  </div>
                  <div className='lg:w-[405px] h-[280px] mt-4 md:mt-6 lg:mt-9'>
                    <img src="bestdeal1.png" alt="" className='h-full w-full object-contain' />
                  </div>
                </div>

                <div className='flex flex-col justify-between px-3 lg:px-0'>
                  <span className='text-center text-[#666666] font-normal text-[12px] md:text-[13px]'>(12)</span>
                  <p className='font-bold text-[14px] md:text-[16px]'>Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone</p>
                  <p className='font-semibold text-[#01A49E] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] flex items-center'>$569.00 <span className='text-[#666666] line-through text-[13px] md:text-[16px]'>$759.00</span></p>
                  <ul className='list-disc font-normal text-[12px] ps-4'>
                    <li>Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</li>
                    <li>DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</li>
                    <li>Commanding Power Design: Twin 16+1+2 Phases Digital VRM</li>
                  </ul>
                  {/* product description */}

                  <p className='flex gap-x-2'>
                    <span className='bg-[#f4fcf4] text-[#01A49E] uppercase text-[9px] md:text-[10px] font-medium w-fit rounded-md p-1 sm:px-2 md:px-3 mt-1 mb-2 md:mt-2.5 md:mb-3'>free shipping</span>
                    <span className='bg-[#f4fcf4] text-[#01A49E] uppercase text-[9px] md:text-[10px] font-medium w-fit rounded-md p-1 sm:px-2 md:px-3 mt-1 mb-2 md:mt-2.5 md:mb-3'>free gift</span>
                  </p>

                  <div className='border-t border-[#DEE2E6] py-2 sm:py-3 md:py-4'>
                    <div className='bg-[#EBEDF3] rounded-full mb-2 md:mb-3'><p className='bg-[#01A49E] p-0.5 rounded-full w-40'></p></div>
                    <p className='text-[12px] md:[13px] text-[#666666]'>Sold: <b className='text-black'>26/75</b></p>
                  </div>

                </div>
                {/* deals of the day product details */}

              </div>

            </div>
            {/* deals of the day left */}

            <div className='hidden space-y-2 lg:flex lg:flex-col'>
              <img className='max-h-[177px] max-w-3xs rounded-[10px]' src="deals1.png" alt="" />
              <img className='max-h-[177px] max-w-3xs rounded-[10px]' src="deals2.png" alt="" />
              <img className='max-h-[177px] max-w-3xs rounded-[10px]' src="deals3.png" alt="" />
            </div>
            {/* deals of the day right */}
          </section>
          {/* deals of the day */}

          <div className='hidden md:flex'>
            {/* -mt-5 -mb-4 */}
            <img src="watch.png" alt="" />
          </div>
          {/* watch section */}

          <section className='flex-col md:flex md:justify-around bg-white md:px-5 lg:px-10 md:py-7 lg:py-12 rounded-[10px]'>
            <div className='flex items-center justify-between'>
              <div className='uppercase text-[14px] md:text-[16px] lg:text-[18px] space-x-3 md:space-x-6 lg:space-x-8'>
                <b className='font-semibold'>best seller</b>
                <span className='font-normal text-[#666666]'>new in</span>
                <span className='font-normal text-[#666666]'>popular</span>
              </div>
              <Link href={"/store"}
                className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
            </div>

            {/* best seller, new in, popular */}

            <div className='flex items-center justify-center'>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-3 md:pt-7 lg:py-8 w-full">
                {bestSellerProductsJSON?.products?.map((product) => (
                  <Card
                    key={product._id}
                    _id={product._id}
                    is_best={product.is_best}
                    imageURL={bestSellerProductsJSON.imageURL + 'main_images/' + product.thumbnail}
                    name={product.name}
                    final_price={product.final_price}
                    original_price={product.original_price}
                    discount_percentage={product.discount_percentage}
                    stock={product.stock}
                  />
                ))}
              </div>
            </div>
            {/* home best seller products */}
          </section>
          {/* best seller */}

        </section >
        {/* inner section */}
      </section >
      {/* deals of the day, pre order, best seller sectons */}

      <section className='w-full my-4' >
        <section className='max-w-[1300px] bg-white rounded-[10px] m-auto p-5 md:py-6 md:px-6 lg:px-9'>
          <div className='flex items-center justify-between'>
            <b className='font-semibold uppercase text-[14px] md:text-[16px] lg:text-[18px] space-x-3 md:space-x-6 lg:space-x-8'>top cellphones & tablets</b>
            <Link href={"/store"}
              className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
          </div>
          {/* top cellphones heading */}

          <div className='flex-col lg:flex lg:flex-row border-b border-[#99999944] pb-3 pt-4 md:pb-5 md:pt-6 lg:space-x-10'>
            <img className='max-h-[200px] w-full object-cover lg:hidden rounded-[10px]' src="banner1.png" alt="" />
            <img className='hidden lg:flex max-h-[200px] max-w-[580px] object-contain' src="redmi-banner.png" alt="" />
            {/* <div className='grid sm:grid-cols-2 lg:grid-cols-3 grow pt-7'> */}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grow pt-7 mx-auto justify-items-center md:mx-0 lg:justify-items-start space-y-6'>
              {topProducts
                .filter(p => p.category_id.name === "Tablet")
                .slice(0, 6) // show maximum 6
                .map((product) => (
                  <div key={product._id} className='flex flex-col items-center max-w-[220px] text-center space-y-2'>
                    <div className='h-[70px] w-[70px]'>
                      <img
                        className='h-full w-full object-cover'
                        src={topProductsJSON.imageURL + 'main_images/' + product.thumbnail}
                        alt={product.name}
                      />
                    </div>
                    <b className='text-[12px] md:text-[14px] font-bold'>{product.name}</b>
                    <span className="flex items-center gap-1 text-[12px] justify-center">
                      <FaCheckCircle
                        className={`${product.stock ? "bg-green-500" : "bg-red-500"} text-white rounded-full`}
                      />
                      {product.stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                ))}
            </div>
            {/* top cellphones */}
          </div>

          <div className='flex items-center justify-center'>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-3 md:pt-7 lg:py-8 w-full">
              {topProducts
                .filter(p => p.category_id.name === "Mobile Phone")
                .slice(0, 5) // show maximum 5
                .map((product) => (
                  <Card
                    key={product._id}
                    _id={product._id}
                    is_best={product.is_best}
                    imageURL={topProductsJSON.imageURL + 'main_images/' + product.thumbnail}
                    name={product.name}
                    final_price={product.final_price}
                    original_price={product.original_price}
                    discount_percentage={product.discount_percentage}
                    stock={product.stock}
                  />
                ))}
            </div>
          </div>
          {/* home top cellphones & tablets products */}

        </section>
      </section >
      {/* home top cellphones & tablets */}

      <section className='w-full my-4' >
        <section className='max-w-[1300px] bg-white rounded-[10px] m-auto p-5 md:py-6 md:px-6 lg:px-9'>
          <div className='flex items-center justify-between'>
            <b className='font-semibold uppercase text-[14px] md:text-[16px] lg:text-[18px] space-x-3 md:space-x-6 lg:space-x-8'>best laptop & computers</b>
            <Link href={"/store"}
              className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
          </div>
          {/* top cellphones heading */}

          <div className='flex-col lg:flex lg:flex-row border-b border-[#99999944] pb-3 pt-4 md:pb-5 md:pt-6 lg:space-x-10'>
            <img className='max-h-[200px] w-full object-cover lg:hidden rounded-[10px]' src="banner1.png" alt="" />
            <img className='hidden lg:flex max-h-[200px] max-w-[580px] object-contain' src="redmi-banner.png" alt="" />
            {/* <div className='grid sm:grid-cols-2 lg:grid-cols-3 grow pt-7'> */}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grow pt-7 mx-auto justify-items-center md:mx-0 lg:justify-items-start space-y-6'>
              {bestProducts
                .filter(p => p.category_id.name === "Laptop")
                .slice(0, 6) // show maximum 6
                .map((product) => (
                  <div key={product._id} className='flex flex-col items-center max-w-[220px] text-center space-y-2'>
                    <div className='h-[70px] w-[70px]'>
                      <img
                        className='h-full w-full object-cover'
                        src={topProductsJSON.imageURL + 'main_images/' + product.thumbnail}
                        alt={product.name}
                      />
                    </div>
                    <b className='text-[12px] md:text-[14px] font-bold'>{product.name}</b>
                    <span className="flex items-center gap-1 text-[12px] justify-center">
                      <FaCheckCircle
                        className={`${product.stock ? "bg-green-500" : "bg-red-500"} text-white rounded-full`}
                      />
                      {product.stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                ))}
            </div>
            {/* top cellphones */}
          </div>

          <div className='flex items-center justify-center'>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-3 md:pt-7 lg:py-8 w-full">
              {bestProducts
                .filter(p => p.category_id.name === "Computer")
                .slice(0, 5) // show maximum 5
                .map((product) => (
                  <Card
                    key={product._id}
                    _id={product._id}
                    is_best={product.is_best}
                    imageURL={topProductsJSON.imageURL + 'main_images/' + product.thumbnail}
                    name={product.name}
                    final_price={product.final_price}
                    original_price={product.original_price}
                    discount_percentage={product.discount_percentage}
                    stock={product.stock}
                  />
                ))}
            </div>
          </div>
          {/* home top cellphones & tablets products */}

        </section>
      </section >
      {/* home best laptops & computers */}

      < section className='w-full rounded-[10px] my-4' >
        <section className='max-w-[1300px] mx-auto flex-col lg:flex lg:flex-row lg:space-x-5 space-y-5 items-center justify-center '>
          <div className='md:flex md:flex-row flex-col items-center md:space-x-3 space-y-3 md:space-y-0'>

            <div className='bg-white rounded-[15px] p-4 md:p-5 lg:p-7'>
              <div className='text-[14px] md:text-[16px] lg:text-[18px] uppercase font-bold flex items-center justify-between mb-3 md:mb-5 lg:mb-7'>
                audios & cameras
                <Link href={"/store"}
                  className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
              </div>
              <img className='pb-3 md:pb-4 lg:pb-6 max-h-[205px] w-full' src="speaker1.png" />
              <div className='grid sm:grid-cols-2 border-t border-[#99999955] pt-3 md:pt-4 lg:pt-6 space-y-2 md:space-y-4 lg:space-y-5'>
                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>
              </div>
              {/* audio & cameras grid div */}
            </div>
            {/* audios & camers div */}

            <div className='bg-white rounded-[15px] p-4 md:p-5 lg:p-7'>
              <div className='text-[14px] md:text-[16px] lg:text-[18px] uppercase font-bold flex items-center justify-between mb-3 md:mb-5 lg:mb-7'>
                gaming
                <Link href={"/store"}
                  className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
              </div>
              <img className='pb-3 md:pb-4 lg:pb-6 max-h-[205px] w-full' src="speaker1.png" />
              <div className='grid sm:grid-cols-2 border-t border-[#99999955] pt-3 md:pt-4 lg:pt-6 space-y-2 md:space-y-4 lg:space-y-5'>
                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>
              </div>
              {/* gaming grid div */}
            </div>
            {/* gaming div */}

            <div className='hidden md:block bg-white rounded-[15px] p-4 md:p-5 lg:p-7'>
              <div className='text-[14px] md:text-[16px] lg:text-[18px] uppercase font-bold flex items-center justify-between mb-3 md:mb-5 lg:mb-7'>
                office equipements
                <Link href={"/store"}
                  className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
              </div>
              <img className='pb-3 md:pb-4 lg:pb-6 max-h-[205px] w-full' src="speaker1.png" />
              <div className='grid sm:grid-cols-2 border-t border-[#99999955] pt-3 md:pt-4 lg:pt-6 space-y-2 md:space-y-4 lg:space-y-5'>
                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>

                <div className='flex-col flex items-center'>
                  <img src="speaker.png" alt="" />
                  <b className='text-[12px] md:text-[14px] font-bold capitalize mt-3 mb-1'>speaker</b>
                  <p className='text-[10px] md:text-[12px] font-normal text-[#666666]'>12 items</p>
                </div>
              </div>
              {/* office equipements grid div */}
            </div>
            {/* office equipements div */}
          </div>
        </section>
      </section >
      {/* audio & cameras, gaming, office equipements */}

      < section className='w-full rounded-[10px] my-4' >
        <section className='max-w-[1300px] mx-auto flex-col lg:flex lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 items-center justify-center '>
          {/* <div className='p-3 md:p-5 lg:p-7'> */}
          <img className='rounded-[10px] py-1.5 bg-[#01A49E]' src="chair.png" alt="" />
          <img className='rounded-[10px] ' src="mobile-on-stairs.png" alt="" />
          {/* </div> */}
        </section>
      </section >
      {/* massage chair section */}

      < section className='max-w-[1300px] mx-auto flex-col md:flex md:justify-around bg-white px-2 py-3 md:px-5 lg:px-10 md:py-7 lg:py-12 rounded-[10px]' >
        <div className='flex items-center justify-between'>
          <div className='uppercase text-[14px] md:text-[16px] lg:text-[18px] space-x-3 md:space-x-6 lg:space-x-8 flex items-center'>
            <b className='font-semibold'>you recently viewed</b>
            <Link href={"/store"}
              className='text-[12px] md:text-[13px] capitalize font-normal text-blue-500 hover:cursor-pointer'>view all</Link>
          </div>
          <div className='flex items-center space-x-4 rounded-xl bg-[#EBEDF3]'>
            <MdKeyboardArrowLeft className=' text-lg sm:text-xl md:text-2xl lg:text-3xl hover:cursor-pointer hover:text-gray-500 ' />
            <MdKeyboardArrowRight className='text-lg sm:text-xl md:text-2xl lg:text-3xl hover:cursor-pointer hover:text-gray-500 ' />
          </div>
        </div>
        {/* best seller, new in, popular */}

        <div className='flex items-center justify-center py-2 sm:py-0'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-3 px-5 sm:px-0 justify-items-center'>
            {/* md:space-x-20 */}

            <div className='flex relative'>
              <div className='uppercase text-[10px] rounded-md bg-black text-white w-fit py-1 px-2 absolute top-0 left-0'>new</div>
              <div className='hidden bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 -right-4'></div>
              <img src="sportband.png" className='object-contain' />
              <div className='flex flex-col'>
                <span className='text-center text-[#666666] font-normal text-[11px]'>(152)</span>
                <span className='text-wrap text-[12px] md:text-[13px] font-bold '>Xomie Remid 8 Sport Water Resitance Watch</span>
                <p className='font-semibold text-[12px] md:text-[14px] lg:text-[16px]'>$579.00</p>
              </div>
            </div>
            {/* recently viewed card div */}

            <div className='flex relative'>
              <div className='uppercase text-[10px] rounded-md bg-black text-white w-fit py-1 px-2 absolute top-0 left-0'>new</div>
              <div className='hidden bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 -right-4'></div>
              <img src="sportband.png" className='object-contain' />
              <div className='flex flex-col'>
                <span className='text-center text-[#666666] font-normal text-[11px]'>(152)</span>
                <span className='text-wrap text-[12px] md:text-[13px] font-bold '>Xomie Remid 8 Sport Water Resitance Watch</span>
                <p className='font-semibold text-[12px] md:text-[14px] lg:text-[16px]'>$579.00</p>
              </div>
            </div>
            {/* recently viewed card div */}

            <div className='flex relative'>
              <div className='uppercase text-[10px] rounded-md bg-black text-white w-fit py-1 px-2 absolute top-0 left-0'>new</div>
              <div className='hidden bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 -right-4'></div>
              <img src="sportband.png" className='object-contain' />
              <div className='flex flex-col'>
                <span className='text-center text-[#666666] font-normal text-[11px]'>(152)</span>
                <span className='text-wrap text-[12px] md:text-[13px] font-bold '>Xomie Remid 8 Sport Water Resitance Watch</span>
                <p className='font-semibold text-[12px] md:text-[14px] lg:text-[16px]'>$579.00</p>
              </div>
            </div>
            {/* recently viewed card div */}

            <div className='flex relative'>
              <div className='uppercase text-[10px] rounded-md bg-black text-white w-fit py-1 px-2 absolute top-0 left-0'>new</div>
              <div className='hidden bg-[#E2E4EB] h-[30px] w-[30px] rounded-full  absolute top-0 -right-4'></div>
              <img src="sportband.png" className='object-contain' />
              <div className='flex flex-col'>
                <span className='text-center text-[#666666] font-normal text-[11px]'>(152)</span>
                <span className='text-wrap text-[12px] md:text-[13px] font-bold '>Xomie Remid 8 Sport Water Resitance Watch</span>
                <p className='font-semibold text-[12px] md:text-[14px] lg:text-[16px]'>$579.00</p>
              </div>
            </div>
            {/* recently viewed card div */}

          </div>
        </div>
        {/* home best seller products */}
      </section >
      {/* your recenetly viewed section */}

      < section className='max-w-[1300px] mx-auto my-10 px-5 sm:px-4' >
        <h3 className='font -bold text-[14px] md:text-[16px] lg:text-[18px]'>Swoo – #1 Online Marketplace for technology</h3>
        <p className='text-[#666666] font-normal  text-[12px] md:text-[14px] my-3 sm:my-4 md:my-5 lg:my-6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae posuere mi. Quisque iaculis dignissim scelerisque. Morbi condimentum sagittis leo vitae tempor.
          Suspendisse in dolor odio. Sed aliquet ac lacus ut luctus. Fusce mattis sollicitudin sem, id lobortis nibh ullamcorper a. Donec vehicula dolor et arcu consequat mattis.
          Fusce mattis nec nulla in scelerisque.
        </p>
        <p className='text-[#666666] font-normal  text-[12px] md:text-[14px] mb-3 sm:mb-4 md:mb-5 lg:mb-6'>
          Morbi pharetra sem mauris, nec aliquet ipsum vestibulum suscipit. Curabitur non euismod dui. Proin eget justo eu erat luctus placerat. Nam rhoncus ipsum ac enim faucibus, at consequat
          ante maximus. Vestibulum at nibh ac odio ultrices varius. Duis vitae libero mollis, lobortis ligula id, varius erat. Sed id odio dictum, laoreet enim ac, commodo magna. Praesent sodales porttitor
          maximus. Sed a lacus felis. Maecenas consectetur consequat orci scelerisque malesuada. Fusce vel orci eu tortor consequat mattis quis at ante. Class aptent taciti sociosqu ad litora
          torquent per conubi,
        </p>
      </section >





    </>
  )
}
