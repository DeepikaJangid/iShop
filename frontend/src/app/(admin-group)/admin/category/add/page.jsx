"use client";
import { axiosApiInstance, slugGenerator } from "@/helper/helper";
import React, { useRef } from "react";
import { FiTag as Tag, FiImage as ImageIcon, FiDroplet as Palette, FiCheck as Check, FiX as X } from "react-icons/fi";
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
        const data = {
            category_name: categoryRef.current.value,
            category_slug: slugRef.current.value
        }

        // axios.post('http://localhost:5000/category/create', data).then(
        axiosApiInstance.post('category/create', data).then(
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
                // console.log(error)
                toast.warning(error.data.msg);
            }
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Add Category</h1>
                        <p className="mt-1 text-sm text-slate-500">Create a category ready for production — accessible, SEO-friendly and beautiful.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300">Preview</button>
                        <div className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow">Draft</div>
                    </div>
                </header>

                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-labelledby="add-category-form">
                    {/* Left: main fields */}
                    <section className="md:col-span-2 rounded-2xl bg-white p-6 shadow-md">
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
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200 capitalize" placeholder="Ex: Laptop" />
                                <p className="mt-1 text-xs text-slate-400">This will be shown across the store.</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Slug (URL)</label>
                                <div className="flex gap-2">
                                    <input
                                        ref={slugRef} //from now on reference for this input is slugRef
                                        readOnly
                                        className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200 lowercase" placeholder="auto-generated-from-name" />
                                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm">/categories/</div>
                                </div>
                                <p className="mt-1 text-xs text-slate-400">Human-readable URL segment for SEO.</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                                <textarea defaultValue="A compact, warm jacket collection for winter — insulated, water-resistant and stylish." rows={4} placeholder="Short description to show on category landing pages and in meta tags." className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200" />
                                <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                                    <div>143/1000</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Parent category</label>
                                    <select defaultValue="clothing" className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200">
                                        <option value="">No parent</option>
                                        <option value="clothing">PCs</option>
                                        <option value="electronics">Mobile Devices</option>
                                        <option value="home">Devices</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
                                    <input type="number" defaultValue={10} min={0} max={999} className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Right: sidebar settings / media */}
                    <aside className="rounded-2xl bg-white p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-900">Appearance & status</h3>
                            <div className="text-xs text-slate-400">Preview</div>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Thumbnail</label>
                                <div className="rounded-lg border border-dashed border-slate-200 p-3">
                                    <div className="relative">
                                        <img src="/example-thumbnail.jpg" alt="thumbnail preview" className="w-full rounded-md object-cover" style={{ maxHeight: 160 }} />
                                        <button type="button" className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-md bg-white/80 px-2 py-1 text-xs shadow">
                                            <X className="h-4 w-4" /> Remove
                                        </button>
                                    </div>
                                    <div className="mt-2 text-xs text-slate-400">PNG, JPG — max 3MB</div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Accent color</label>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-12 rounded-md border border-slate-200 p-0" aria-hidden style={{ background: '#10b981' }} />
                                    <div className="flex-1 rounded-md border border-slate-200 p-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 truncate">
                                                <Palette className="h-4 w-4 text-slate-500" />
                                                <div className="truncate">#10B981</div>
                                            </div>
                                            <div className="text-xs text-slate-400">Used in badges & accents</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Visibility</label>
                                    <div className="text-sm text-slate-500">Control whether this category is publicly visible.</div>
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-3">
                                        <div className="inline-block h-6 w-11 rounded-full bg-green-500" aria-hidden />
                                        <div className="ml-3 text-sm font-medium text-slate-700">Public</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700">SEO Preview</label>
                                <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
                                    <div className="truncate text-sm font-medium text-slate-900">Winter Jackets</div>
                                    <div className="mt-1 truncate text-xs text-slate-500">/categories/winter-jackets</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm bg-slate-900 hover:bg-slate-800 hover:cursor-pointer">Save Category</button>
                            <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm hover:cursor-pointer">Reset</button>
                        </div>


                        {/* yaha/yha par changes karne hai -> toastify mein jo msg aa rha hai use yaha kaise show karwa sakte hai? */}
                        <div className="mt-4 flex items-center gap-3 rounded-md bg-green-50 p-3 text-sm text-green-700">
                            <Check className="h-4 w-4" /> Saved successfully.
                        </div>
                    </aside>
                </form>

                <div className="mt-8 text-sm text-slate-500">Tip: Category slugs are unique. Use meaningful names for better SEO.</div>
            </div>
        </div>
    );
}
