'use client'
import { axiosApiInstance, slugGenerator } from "@/helper/helper";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { FiPlus, FiCopy, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ColorEdit({ colorData }) {

    const router = useRouter();
    const colorNameRef = useRef();
    const slugRef = useRef();
    const codeRef = useRef();

    const createSlug = () => {
        const slug = slugGenerator(colorNameRef.current.value)
        slugRef.current.value = slug;
    }



    const submitHandler = (event) => {
        event.preventDefault();

        const data = {
            color_name: colorNameRef.current.value,
            color_slug: slugRef.current.value,
            color_code: codeRef.current.value,
        }

        axiosApiInstance.put('colors/update/' + colorData._id, data).then(
            (response) => {
                toast.success(response.data.msg);
                if (response.data.flag == 1) {
                    router.push("/admin/colors")
                    colorNameRef.current.value = ''
                    slugRef.current.value = ''
                }
            }
        ).catch(
            (error) => {
                toast.warning(error.data.msg);
            }
        )
    }

    return (
        <form className="w-full min-h-screen bg-white p-6">

            {/* Header */}
            <div className="md:flex md:flex-row flex-col space-y-3 md:space-y-0 items-start justify-between">
                <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">Edit Color</h3>
                    <p className="mt-1 text-gray-500 text-[12px] md:text-[14px] ">Fill in the details to update the color.</p>
                </div>


                <button
                    onClick={submitHandler}
                    type="button" className="text-[12px] md:text-[14px] inline-flex items-center gap-2 bg-[#01A49E] text-white px-4 py-1.5 rounded-lg shadow hover:cursor-pointer font-bold">
                    <FiSave className="text-xl" /> Save Changes
                </button>
            </div>

            {/* Inputs */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px] md:text-[14px]">

                {/* Name */}
                <label className="col-span-3 flex flex-col">
                    <span className="text-sm text-gray-600 font-medium text-[12px] md:text-[14px]">Color Name</span>
                    <input
                        ref={colorNameRef}
                        onChange={createSlug}
                        defaultValue={colorData.name}
                        placeholder="e.g. Sky Blue"
                        className="w-full mt-2 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 text-[12px] md:text-[14px] placeholder:text-[12px] placeholder:md:text-[14px] capitalize"
                    />
                    <span className="text-xs text-gray-400 mt-1 text-[10px] md:text-[12px]">Max 15 characters</span>
                </label>

                {/* Slug */}
                <label className="col-span-3 flex flex-col">
                    <span className="text-sm text-gray-600 font-medium text-[12px] md:text-[14px]">Slug Name</span>
                    <input
                        ref={slugRef}
                        defaultValue={colorData.slug}
                        readOnly
                        placeholder="auto-generated-from-name"
                        className="w-full mt-2 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 text-[12px] md:text-[14px] placeholder:text-[12px] placeholder:md:text-[14px] lowercase"
                    />
                    <span className="text-xs text-gray-400 mt-1 text-[10px] md:text-[12px]">Max 15 characters</span>
                </label>

                {/* Color Code */}
                <label className="col-span-3 flex flex-col">
                    <span className="text-sm text-gray-600 font-medium text-[12px] md:text-[14px]">Color Code (HEX)</span>

                    <div className="mt-2 flex gap-3 items-center">
                        <input
                            onFocus={(e) => e.target.value = ''}
                            defaultValue={colorData.code}
                            ref={codeRef}
                            placeholder="#AABBCC"
                            className="w-full flex-1 p-3 rounded-lg border border-gray-200 text-gray-500 focus:ring-2 focus:ring-indigo-200 placeholder:text-[12px] placeholder:md:text-[14px] text-[12px] md:text-[14px]"
                        />

                        {/* <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 shadow-2xl rounded-lg text-sm text-[12px] md:text-[14px] hover:cursor-pointer"
            >
              <FiCopy /> Copy
            </button> */}
                        {/* copy button */}

                        <input
                            type="color"
                            className="shadow-2xl h-10 rounded-2xl hover:rounded-none transition-all duration-200 hover:cursor-pointer" />
                    </div>
                </label>
            </div>
        </form>
    );
}
