"use client";
import { axiosApiInstance, slugGenerator } from "@/helper/helper";
import Link from "next/link";
import { useRef } from "react";
import { FiChevronLeft, FiTag as Tag, FiImage as ImageIcon, FiDroplet as Palette, FiCheck as Check, FiX as X } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AddCategoryPage() {
    const categoryRef = useRef(); //userRef -> reference hook
    const slugRef = useRef(); //create outside the submitHandler

    const createSlug = () => {
        const slug = slugGenerator(categoryRef.current.value);
        slugRef.current.value = slug;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // console.log(event.target.image.files[0]) //files - cause input type is file.. after that it will give filelist

        // FormData media file bhejni ho tab use hoga agar media files nahi hai to fir object bana kr bhej sakte hai
        // const data = {
        //     category_name: categoryRef.current.value,
        //     category_slug: slugRef.current.value
        // } aise.


        const formData = new FormData(); //image string mein nahi hota, binary data hota hai image kya to object mein binary data nahi ja sakta isliye ek FormData object banaya hai jiske andar binary data jayega. formdata (img, audio, video ) binary data leke server ke pas ja sakta hai using browser api.

        formData.append('category_image', event.target.image.files[0]);
        //controller mein jo name define kiya hua, user se data lene ke liye wahi aayega
        // & event target krke jo 0th index pe file hai uski detail leke aa raha hai woh
        formData.append('category_name', categoryRef.current.value);
        formData.append('category_slug', slugRef.current.value);

        // axios.post('http://localhost:5000/category/create', data).then(
        axiosApiInstance.post('category/create', formData).then(
            (response) => {
                // console.log(response.data.msg)
                toast.success(response.data.msg);
                if (response.data.flag == 1) {
                    categoryRef.current.value = ''
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
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-start justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                        <Link
                            href={'/admin/category'}
                            className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200">
                            <FiChevronLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Add Category</h1>
                            <p className="mt-1 text-sm text-slate-500">Create a category ready for production — accessible, SEO-friendly and beautiful.</p>
                        </div>
                    </div>

                </header>

                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-labelledby="add-category-form">
                    {/* Left: main fields */}
                    <section className="md:col-span-3 rounded-2xl bg-white p-6 shadow-md">
                        <div className="mb-6 flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-slate-100 to-slate-50">
                                <Tag className="h-6 w-6 text-slate-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-slate-900">Category details</h2>
                                <p className="mt-1 text-sm text-slate-500">Name, slug and description used across the store and SEO.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                                <input
                                    ref={categoryRef} //from now on reference for this input is categoryRef
                                    onChange={createSlug} //jab jab name input mein change hoga createSlug function call krna hai
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200" placeholder="Ex: Laptop" />
                                <p className="mt-1 text-xs text-slate-400">This will be shown across the store.</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Slug (URL)</label>
                                <div className="flex gap-2">
                                    <input
                                        ref={slugRef} //from now on reference for this input is slugRef
                                        readOnly
                                        className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200 lowercase" placeholder="auto-generated-from-name" />
                                </div>
                                <p className="mt-1 text-xs text-slate-400">Human-readable URL segment for SEO.</p>
                            </div>

                            {/* Image Upload Section */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Category Image</label>
                                <div className="flex flex-col items-center gap-4">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="hover:cursor-pointer w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200" />
                                    <p className="mt-1 text-xs text-slate-400">Upload a category image (JPG, PNG, or GIF, max 3MB).</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button type="submit" className="inline-flex w-fit items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm bg-slate-900 hover:bg-slate-800 hover:cursor-pointer">Save Category</button>
                        </div>
                    </section>
                </form>

                <div className="mt-8 text-sm text-slate-500">Tip: Category slugs are unique. Use meaningful names for better SEO.</div>
            </div>
        </div>
    );
}
