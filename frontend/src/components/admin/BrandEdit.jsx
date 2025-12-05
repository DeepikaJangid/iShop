'use client'
import { axiosApiInstance, slugGenerator } from '@/helper/helper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FiChevronLeft } from 'react-icons/fi';

export default function EditBrandPage({ brand, imageURL }) {

    const [selectedImage, setSelectedImage] = React.useState(null)

    const brandRef = useRef();
    const slugRef = useRef();
    const ownerRef = useRef();
    const descRef = useRef();
    const imageRef = useRef();
    const router = useRouter();


    const createSlug = () => {
        const slug = slugGenerator(brandRef.current.value);
        slugRef.current.value = slug;
    }

    const imageChangeHandler = () => {
        const file = imageRef.current.files[0];
        if (file) {
            const imagePreviewUrl = URL.createObjectURL(file);
            setSelectedImage(imagePreviewUrl);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData;

        formData.append('brand_name', brandRef.current.value);
        formData.append('brand_slug', slugRef.current.value);
        formData.append('brand_description', descRef.current.value);
        formData.append('brand_owner', ownerRef.current.value);
        formData.append('brand_image', event.target.image.files[0]);


        axiosApiInstance.put('brand/update/' + brand._id, formData).then(
            (response) => {
                toast.success(response.data.msg);
                if (response.data.flag == 1) {
                    router.push("/admin/brand")
                    brandRef.current.value = ''
                    slugRef.current.value = ''
                    ownerRef.current.value = ''
                    descRef.current.value = ''
                    imageRef.current.value = ''
                    setSelectedImage(null)
                }
            }
        ).catch(
            (error) => {
                toast.warning(error.data.msg);
            }
        )
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 p-8">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                        <Link
                            href={'/admin/brand'}
                            className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200">
                            <FiChevronLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900">Edit brand</h1>
                            <p className="text-sm text-slate-500">Update brand details, media and settings</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1">
                    {/* Form column */}
                    <form
                        onSubmit={submitHandler}
                        className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
                        <section>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-slate-600">Brand name</label>
                                    <input
                                        onChange={createSlug}
                                        ref={brandRef}
                                        defaultValue={brand?.name}
                                        className="capitalize mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-600">Slug</label>
                                    <input
                                        ref={slugRef}
                                        readOnly
                                        defaultValue={brand?.slug}
                                        className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                                </div>

                                <div>
                                    <label className="text-xs text-slate-600">Owner</label>
                                    <input
                                        ref={ownerRef}
                                        defaultValue={brand?.owner}
                                        className="capitalize mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                                </div>

                                <div className="md:col-span-3">
                                    <label className="text-xs text-slate-600">Description</label>
                                    <textarea
                                        ref={descRef}
                                        defaultValue={brand?.description}
                                        className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm h-28" />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-sm font-semibold text-slate-700 mb-2">Media</h2>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                ref={imageRef}
                                onChange={imageChangeHandler}
                                className="hover:cursor-pointer w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                            />
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center overflow-hidden border border-slate-100">
                                        <img
                                            src={selectedImage || imageURL}
                                            alt="logo"
                                            className="w-12 h-12 object-contain" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-700 font-medium">Logo</div>
                                        <div className="text-xs text-slate-500 mt-1">PNG recommended</div>
                                    </div>
                                </div>

                                <div className="flex flex-col shadow-md rounded-md col-span-2">
                                    <div className="w-full h-28 bg-white flex items-center justify-center overflow-hidden border border-slate-100">
                                        <img
                                            src={selectedImage || imageURL}
                                            alt="banner"
                                            className="p-2 object-contain w-full h-full" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="inline-flex items-center gap-2 bg-white border border-red-100 text-red-600 px-3 py-2 rounded-lg hover:cursor-pointer">Delete</button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer">Save Changes</button>
                                </div>
                            </div>
                        </section>
                    </form>

                    {/* Right column: quick actions & activity */}
                    {/* <aside className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700">Quick actions</h4>
                            <div className="mt-3 space-y-2">
                                <button className="w-full px-3 py-2 rounded-lg bg-slate-50 text-sm">Feature this brand</button>
                                <button className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm">Unpublish</button>
                                <button className="w-full px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm">Delete brand</button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-slate-700">Activity</h4>
                            <div className="mt-3 text-sm text-slate-600 space-y-2">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                                    <div>
                                        <div className="text-xs text-slate-700">Published by Marketing Team</div>
                                        <div className="text-xs text-slate-500">Aug 11, 2025 • 10:32 AM</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2" />
                                    <div>
                                        <div className="text-xs text-slate-700">Logo updated</div>
                                        <div className="text-xs text-slate-500">Jul 30, 2025</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-slate-700">Links</h4>
                            <div className="mt-3 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <FiLink className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">View live</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiTag className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">Manage tags</span>
                                </div>
                            </div>
                        </div>
                    </aside> */}
                </div>
            </div>
        </div>
    );
}