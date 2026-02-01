'use client'
import { FaImage, FaTag, FaPalette, FaStore, } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { axiosApiInstance, slugGenerator } from "@/helper/helper";
import { toast } from "react-toastify";
import { getBrands } from "@/api-calls/brand";
import { getColors } from "@/api-calls/colors";
import { getCategories } from "@/api-calls/category";
// import Select from 'react-select'; //by using this "tree hydration error" occurs because 
/*⚠️ react-select is NOT SSR-safe
It relies on:
=> window
=> layout measurements
=> dynamic DOM behavior
=> So the HTML generated on the server ≠ HTML generated in the browser.*/
import dynamic from "next/dynamic";
import FileUpload from "@/components/common/FileUpload";
const Select = dynamic(() => import("react-select"), {
    ssr: false,
});
import { Editor } from 'primereact/editor';
import { useRouter } from "next/navigation";

export default function EditProductPage({ product, imageURL }) {

    const [categoryData, setCategoryData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [description, setDescription] = useState("");
    const [colorIds, setColorId] = useState([]);
    const [showDescription, setShowDescription] = useState(product.description);

    // console.log(mainImage)
    useEffect(() => {
        if (product?.description) {
            setShowDescription(product.description);
        }
    }, [product]);

    const router = useRouter();
    const productRef = useRef();
    const slugRef = useRef();
    // const productDescRef = useRef();
    const originalPriceRef = useRef();
    const discountPercentRef = useRef();
    const finalPriceRef = useRef();

    const fetchOtherData = async () => {
        const categoryJSON = await getCategories();
        const brandJSON = await getBrands();
        const colorJSON = await getColors();
        setCategoryData(categoryJSON.categories);
        setBrandData(brandJSON.brands);
        setColorData(colorJSON.colors);
    }

    useEffect(
        () => {
            fetchOtherData();
        }, []
    )

    const calculateDiscountPercent = () => {
        const op = Number(originalPriceRef.current.value);
        const fp = Number(finalPriceRef.current.value);
        // discounted price = 100 - (finalPrice/originalPrice * 100);
        if (fp > op) {
            toast.warning('Final Price Cannot Be Greater Than Original Price.')
            discountPercentRef.current.value = "";
            return //return lagana imp hai nahi lagaya to discountPercentRef empty nahi hoga 
        };
        if (op != "" && fp != "") {
            const discount = 100 - (fp / op * 100);
            discountPercentRef.current.value = discount.toFixed(2);
        }

    }

    const createSlug = () => {
        const slug = slugGenerator(productRef.current.value);
        slugRef.current.value = slug;
    }

    const colorStyles = {
        option: (base, state) => ({
            ...base, //base is the default style object provided by react-select, It contains all the styles react-select already applies to that component.
            //  for instance:
            /*
            {
                backgroundColor: 'white',
                color: '#333',
                cursor: 'default',
                display: 'block',
                fontSize: '1rem',
                lineHeight: '1.5',
                padding: '8px 12px',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
            }
                and ...base is spreaded here so that we can access the style properties 
            */
            backgroundColor:
                state.isFocused || state.isSelected ? state.data.code : undefined,
            color: state.isFocused || state.isSelected ? '#fff' : '#000',
        }),

        multiValue: (base, { data }) => ({
            ...base,
            backgroundColor: data.code,
        }),

        multiValueLabel: base => ({
            ...base,
            color: '#8B4513',
        }),
    }

    const getFile = (files) => { //jo bhi image select hogi uski details fetch karne ke liye function
        setMainImage(files[0])
        // console.log(files)
    }

    const colorChangeHanlder = (options) => {
        const ids = options.map(opt => opt.value)
        setColorId(ids);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (!mainImage || !mainImage.file) {
            toast.warning("Please upload a thumbnail image");
            return;
        }
        formData.append("product_name", productRef.current.value);
        formData.append('product_slug', slugRef.current.value);
        formData.append('description', description);
        formData.append('original_price', originalPriceRef.current.value);
        formData.append('discount_percent', discountPercentRef.current.value);
        formData.append('final_price', finalPriceRef.current.value);
        formData.append('thumbnail', mainImage.file);
        formData.append('category_id', event.target.category_id.value);
        if (colorIds.length > 0) {
            formData.append('color_ids', JSON.stringify(colorIds)); //colorids ka array trabel nahi krta to stringfy krke send krna hai
        }
        // agar ids length 0 hai to color ko update nahi karna hai
        formData.append('brand_id', event.target.brand_id.value);

        axiosApiInstance.put("/product/update/" + product._id, formData).then(
            (response) => {
                toast.success(response.data.msg);
                if (response.data.flag == 1) {
                    router.push("/admin/product");
                }
            }
        ).catch(
            (error) => {
                toast.warning(error.response.data.msg);
            }
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="">
                <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 flex items-center gap-4 sm:gap-6 md:gap-8">
                    <Link
                        href={'/admin/product'}
                        className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200">
                        <FiChevronLeft className="w-5 h-5 text-slate-600" />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Edit product for your store
                        </p>
                    </div>
                </div>
            </div>

            <form
                onSubmit={submitHandler}
                className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    onChange={createSlug}
                                    type="text"
                                    ref={productRef}
                                    defaultValue={product.name}
                                    placeholder="Iphone17"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    ref={slugRef}
                                    readOnly
                                    defaultValue={product.slug}
                                    placeholder="Iphone17"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30 focus:outline-none"
                                />
                            </div>



                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <Editor
                                    value={showDescription}
                                    onTextChange={(d) => setDescription(d.htmlValue)}
                                    style={{ height: "200px", borderColor: "#E5E7EB", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", }} />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FaTag className="text-[#01A49E]" />
                            Pricing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Original Price
                                </label>
                                <input
                                    defaultValue={product.original_price}
                                    onChange={calculateDiscountPercent}
                                    type="number"
                                    ref={originalPriceRef}
                                    placeholder="Enter Original Price"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    Discount %
                                </label>
                                <input
                                    defaultValue={product.discount_percentage}
                                    type="number"
                                    ref={discountPercentRef}
                                    readOnly
                                    placeholder="Discount Percentage"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Final Price
                                </label>
                                <input
                                    defaultValue={product.final_price}
                                    onChange={calculateDiscountPercent}
                                    type="number"
                                    ref={finalPriceRef}
                                    placeholder="Enter Final Price"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <FaImage className="text-[#01A49E]" />
                            Media
                        </h2>

                        <div className="border border-gray-200 rounded-lg p-6 text-center hover:cursor-pointer">
                            <p className="text-sm font-medium text-gray-700">
                                Thumbnail Image
                            </p>
                            {/* <img src={imageURL} alt="" className="h-10 w-10" /> */}
                            <FileUpload imageURL={imageURL} onFilesChange={getFile} className="mt-4" maxSize={2 * 1024 * 1024} maxFiles={1} />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Organization */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Organization
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <Select
                                    defaultValue={{ label: product.category_id.name }}
                                    name="category_id"
                                    options={
                                        categoryData?.map(
                                            (cats) => {
                                                return {
                                                    value: cats._id,
                                                    label: cats.name
                                                }
                                            }
                                        )
                                    } />
                                {/* options mein do cheej hogi.. label and value. Label - jo user ko dikhega, Value - jo selection par database mein jayegi */}
                            </div>

                            <div>
                                <label className="md:block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <FaPalette />
                                    Colors
                                </label>
                                <Select
                                    defaultValue={product.color_ids.map(
                                        (clr) => {
                                            return {
                                                label: clr.name,
                                                code: clr.code
                                            }
                                        }
                                    )}
                                    onChange={colorChangeHanlder}
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                    styles={colorStyles}
                                    options={
                                        colorData?.map(
                                            (color) => {
                                                return {
                                                    value: color._id,
                                                    label: color.name,
                                                    code: color.code
                                                }
                                            }
                                        )
                                    } />
                            </div>

                            <div>
                                <label className="md:block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <FaStore />
                                    Brand
                                </label>
                                <Select
                                    defaultValue={{ label: product.brand_id.name }}
                                    name="brand_id"
                                    options={
                                        brandData?.map(
                                            (brand) => {
                                                return {
                                                    value: brand._id,
                                                    label: brand.name
                                                }
                                            }
                                        )
                                    } />
                            </div>
                        </div>
                    </div>

                    {/* Save */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#01A49E] px-4 py-3 text-sm font-medium text-white shadow hover:opacity-90 hover:cursor-pointer">
                        Save Product
                    </button>
                </div>
            </form >
        </div >
    );
}
