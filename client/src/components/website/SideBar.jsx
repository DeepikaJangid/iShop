'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getCategories } from "@/api-calls/category";
import { getColors } from "@/api-calls/colors";
import { getBrands } from '@/api-calls/brand';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { } from 'next/router';

export default function SideBar() {
    const router = useRouter();
    const params = useParams();
    const { category_slug } = params;
    const current_category = category_slug;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // gets the current path.. eg./store/laptop

    const [categories, setCategory] = useState([]);
    const fetchData = async () => {
        const categoryJSON = await getCategories();
        const categoryData = categoryJSON.categories;
        setCategory(categoryData);
        const colorJSON = await getColors();
        const colorData = colorJSON.colors;
        setColors(colorData);

        const brandJSON = await getBrands();
        const brandData = brandJSON.brands;
        setBrands(brandData);

        const brandsJSON = await getBrands();
        getBrandJSON(brandsJSON);
    }
    useEffect(
        () => {
            fetchData();
        }, []
    )

    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandJSON, getBrandJSON] = useState({});
    const [showAllColors, setShowAllColors] = useState(false); // For toggling the color visibility
    const [showAllBrands, setShowAllBrands] = useState(false); // For toggling the brand visibility

    const handleViewAllColors = () => {
        setShowAllColors(!showAllColors); // Toggle visibility of all colors
    };

    const handleViewAllBrands = () => {
        setShowAllBrands(!showAllBrands); // Toggle visibility of all brands
    };


    // brands seachparam logic
    const [brandIds, setBrandIds] = useState([]);
    const [colorIds, setColorIds] = useState([]);

    useEffect(
        () => {
            setBrandIds([]);
            setColorIds([]);
        }, [pathname] //jab bhi pathname change hoga meaning koi all pe click kare and then waha filter apply krein brands ka and then laptop pe click krein to woh filter jo all categories par laga tha woh empty ho jana chahiye
    )

    const handleBrandSelection = (e) => {
        const brandId = e.target.value; //jis bhi value par user ne click kiya hai uski id ko brandId variable mein assign kr diya
        const currentBrandIds = [...brandIds]; //fir brandsIds ko(not brandId but brandIds) spread krke currentBrandIds ko de diya
        const index = currentBrandIds.indexOf(brandId); // abhi jis id par user ne click kiya hai woh currentBrandIs array ke andar hai to index value positive aa jayegi. 
        if (index != -1) {
            currentBrandIds.splice(index, 1); //to woh index not equal to -1 hai, to us id wali value ko delete karwa do array se kyunki woh pehle se selected hai
        } else {
            currentBrandIds.push(brandId); //agar pehle se selected nahi hai to currentBrandIds array ke andar push karwa do new value ko
        }
        setBrandIds(currentBrandIds);
    }

    useEffect(
        () => {
            const query = new URLSearchParams(searchParams.toString());
            // It’s a built-in JavaScript helper that lets you read, add, remove, and change query parameters in a URL. Query parameters are the part after the ? in a URL: https://example.com?page=2&sort=name
            // brandIds.length != 0 && query.append('brand_ids', brandIds.join(',')) //array ko string mein covert kr diya join use krke. eg. id1%2Cid2%2Cid3... %2C means comma
            query.delete('brand_slug') //if brand id jo select ho chuki hai woh query mein se hti nhi hai to use delete krdo
            if (brandIds.length != 0) {
                query.append('brand_slug', brandIds.join('-')) //array ko string mein covert kr diya join use krke. eg. id1-id2-id3
            }
            query.delete('color_slug') //if brand id jo select ho chuki hai woh query mein se hti nhi hai to use delete krdo
            if (colorIds.length != 0) {
                colorIds.length != 0 && query.append('color_slug', colorIds.join('-'))
            }
            //                                      key name = colorIds        
            router.push(`${pathname}?${query.toString()}`) //yeh upar url mein push kr dega query ko string mein convert krke
            // eg. http://localhost:3000/store/laptop?brand_ids=692eb0c7b4c6173b7a466fc0&brand_ids=692eb0c7b4c6173b7a466fc0-692eb0a7b4c6173b7a466fbd


        }, [brandIds, colorIds] //jab jab brandids change hogi tab tab search params change honge. searchparams hai jo ? ke baad aate hai. example - laptop?apple&silver.
    )

    const handleColorSelection = (e) => {
        const colorId = e.target.value;
        const currentColorIds = [...colorIds];
        const index = currentColorIds.indexOf(colorId);
        if (index != -1) {
            currentColorIds.splice(index, 1);
        } else {
            currentColorIds.push(colorId);
        }
        setColorIds(currentColorIds);
    }

    return (
        <>
            <aside className='bg-[#EEEFF6] rounded-[10px] p-5 row-span-1 md:col-span-2 lg:col-span-1 md:max-w-[300px] lg:w-auto'>
                <h3 className='font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black'>categories</h3>
                <button className='font-bold text-[11px] md:text-[12px] capitalize text-black bg-white py-2 md:py-3 ps-4 pe-2 md:ps-5 md:pe-3 lg:ps-7 lg:pe-4 text-center md:text-start rounded-lg w-full'>all categories</button>
                <p className='font-bold text-[14px] md:text-md my-3 '>Cell Phones & Tablets</p>
                <ul className='list-none font-normal flex flex-col text-[14px] md:text-md leading-[30px] px-3 md:px-5 gap-x-2 md:gap-0'>
                    <li className={`${current_category == undefined && 'text-red-500'} hover:cursor-pointer`}>
                        <Link href={"/store"}>All</Link>
                    </li>
                    {
                        categories.map(
                            (cat, idx) => {
                                return (
                                    <Link
                                        href={`/store/${cat.slug}`}
                                        key={idx}
                                        className={`${current_category == cat.slug && 'text-red-500'} hover:cursor-pointer`}>{cat.name} <span className={`${current_category == cat.slug && 'text-red-500'}text-gray-500 text-[12px]`}>({cat.productCount})</span></Link>
                                )
                            }
                        )
                    }
                </ul>
            </aside>

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

                <p className='font-bold text-[12px] md:text-[14px] mb-3 mt-4'>By Colors</p>
                <ul className='list-none font-normal text-[12px] md:text-[14px] leading-[30px] '>
                    {colors.slice(0, 5).map((color,) => (
                        <li key={color._id}
                            className='flex items-center gap-x-1.5'>
                            <input type="checkbox"
                                checked={colorIds.includes(color.slug) ? true : false}
                                value={color.slug}
                                onChange={handleColorSelection}
                                className='hover:cursor-pointer' />
                            <div style={{ backgroundColor: color.code }}
                                className='h-5 w-5 border border-[#888888] rounded' >
                            </div>
                            {color.name} <span className='text-gray-500 text-[12px]'>({color.productCount})</span>
                        </li>
                    ))}

                    {/* Display remaining colors when 'View All' is clicked */}
                    {showAllColors &&
                        colors.slice(5).map((color, _) => (
                            <li key={color._id}
                                className='flex items-centerbr gap-x-1.5'>
                                <input type="checkbox"
                                    checked={colorIds.includes(color.slug) ? true : false}
                                    value={color.slug}
                                    onChange={handleColorSelection}
                                    className='hover:cursor-pointer' />
                                <div style={{ backgroundColor: color.code }}
                                    className='h-5 w-5 border border-[#888888] rounded' >
                                </div>
                                {color.name} <span className='text-gray-500 text-[12px]'>({color.productCount})</span>
                            </li>
                        ))
                    }

                    {/* Button to show more colors */}
                    {colors.length > 5 && (
                        <button
                            onClick={handleViewAllColors}
                            className='text-[12px] md:text-[14px] text-[#1ABA1A] hover:underline mt-2 pb-3 w-full hover:cursor-pointer'
                        >
                            {showAllColors ? 'View Less' : 'View All'}
                        </button>
                    )}
                </ul >

                <p className='font-bold text-[12px] md:text-[14px] mb-3 mt-4'>By Brands</p>
                <ul className='list-none font-normal text-[12px] md:text-[14px] leading-[30px]'>
                    {brands.slice(0, 5).map((brand, idx) => (
                        <li key={idx}
                            className='flex items-center gap-x-1.5'>
                            <input type="checkbox"
                                checked={brandIds.includes(brand.slug) ? true : false}
                                value={brand.slug}
                                onChange={handleBrandSelection}
                                className='hover:cursor-pointer' />
                            <img
                                className='rounded my-2'
                                src={brandJSON.imageURL + brand.image_name} height={25} width={25} alt={brand.name} />
                            {brand.name}<span className='text-gray-500 text-[12px]'>({brand.productCount})</span>
                        </li>
                    ))}

                    {/* Display remaining brands when 'View All' is clicked */}
                    {showAllBrands &&
                        brands.slice(5).map((brand, idx) => (
                            <li key={idx}
                                className='flex items-center gap-x-1.5'>
                                <input type="checkbox"
                                    checked={brandIds.includes(brand.slug) ? true : false}
                                    value={brand.slug}
                                    onChange={handleBrandSelection}
                                    className='hover:cursor-pointer' />
                                <img
                                    className='rounded my-2'
                                    src={brandJSON.imageURL + brand.image_name} height={25} width={25} alt={brand.name} />
                                {brand.name}<span className='text-gray-500 text-[12px]'>({brand.productCount})</span>
                            </li>
                        ))
                    }

                    {/* Button to show more brands */}
                    {brands.length > 5 && (
                        <button
                            onClick={handleViewAllBrands}
                            className='text-[12px] md:text-[14px] text-[#1ABA1A] md:pb-2 hover:underline mt-2 w-full hover:cursor-pointer'
                        >
                            {showAllBrands ? 'View Less' : 'View All'}
                        </button>
                    )}
                </ul>
                {/* by colors & brands */}
            </aside>
        </>
    )
}
