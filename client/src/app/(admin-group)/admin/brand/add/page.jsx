'use client'
import { axiosApiInstance, slugGenerator } from '@/helper/helper';
import Link from 'next/link';
import React, { useRef } from 'react';
import { FiUpload, FiSave, FiChevronLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function AddBrandPage() {

    const [selectedImage, setSelectedImage] = React.useState(null);

    const brandRef = useRef();
    const slugRef = useRef();
    const brandDescRef = useRef();
    const ownerRef = useRef();
    const imageRef = useRef();

    const createSlug = () => {
        const slug = slugGenerator(brandRef.current.value);
        slugRef.current.value = slug;
    }

    // DRAG N DROP HANDLER (CHAT-GPT CODE)
    // onDragOver → allow drop
    // onDrop → read dropped file
    // onChange → read regular uploaded file

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        // dataTransfer is a built-in browser API that holds all the data involved in a drag-and-drop action. When you drag something(like a file) and drop it onto an element, the browser puts information about the dropped item(s) inside: event.dataTransfer.
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setSelectedImage(previewUrl);
    };

    const imageChangeHandler = () => {
        const file = imageRef.current.files?.[0];

        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setSelectedImage(previewUrl);
    }



    const submitHandler = (event) => {
        event.preventDefault();

        let brand_image = event.target.image.files[0];

        const formData = new FormData();

        formData.append('brand_image', brand_image);
        formData.append('brand_name', brandRef.current.value);
        formData.append('brand_slug', slugRef.current.value);
        formData.append('brand_description', brandDescRef.current.value);
        formData.append('brand_owner', ownerRef.current.value);

        axiosApiInstance.post('brand/create', formData).then(
            (response) => {
                toast.success(response.data.msg);
                if (response.data.flag === 1) {
                    brandRef.current.value = '';
                    slugRef.current.value = '';
                    brandDescRef.current.value = '';
                    ownerRef.current.value = '';
                    imageRef.current.value = "";
                    setSelectedImage(null);
                }
            }
        ).catch(
            (error) => {
                console.log('brand add page', error);
                toast.warning(error.data.msg);
            }
        )
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 p-8">
            <div className="">
                <div className="mb-6 flex items-center gap-4 sm:gap-6 md:gap-8">
                    <Link
                        href={'/admin/brand'}
                        className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200">
                        <FiChevronLeft className="w-5 h-5 text-slate-600" />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Add brand</h1>
                        <p className="text-sm text-slate-500">Create a new brand</p>
                    </div>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
                    <div>
                        <label className="text-xs text-slate-600">Brand name</label>
                        <input
                            ref={brandRef}
                            onChange={createSlug}
                            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="e.g. Always Wonder" />
                    </div>

                    <div>
                        <label className="text-xs text-slate-600">Brand Slug</label>
                        <input
                            ref={slugRef}
                            readOnly
                            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm lowercase" placeholder="auto-generated-from-name" />
                    </div>

                    <div>
                        <label className="text-xs text-slate-600">Description</label>
                        <textarea
                            ref={brandDescRef}
                            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm h-24" placeholder="Short brand description" />
                    </div>

                    <div>
                        <label className="text-xs text-slate-600">Owner</label>
                        <input
                            ref={ownerRef}
                            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="e.g. LingLing Kwong" />
                    </div>

                    <div>
                        <label className="text-xs text-slate-600">Brand logo</label>
                        <div className="mt-2">
                            <label className="flex items-center justify-center w-full h-36 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 cursor-pointer overflow-hidden"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    ref={imageRef}
                                    onChange={imageChangeHandler}
                                />

                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt="Preview"
                                        className="w-full h-full object-contain p-2"
                                    />
                                ) : (
                                    <div className="text-center text-sm text-slate-500">
                                        <FiUpload className="mx-auto mb-2 w-6 h-6 text-slate-400" />
                                        <div>Click or drag & drop an image (logo)</div>
                                    </div>
                                )}
                            </label>
                        </div>

                    </div>

                    <button
                        type="submit" className="inline-flex items-center gap-2 bg-[#01A49E] text-white px-4 py-2 rounded-lg hover:cursor-pointer">
                        <FiSave className="w-4 h-4" />
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
