import { getBrands } from '@/api-calls/brand';
import Link from 'next/link';
import React from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiChevronDown, FiFilter, FiChevronLeft } from 'react-icons/fi';
import StatusToggle from '@/components/admin/StatusToggle';
import DeleteData from '@/components/admin/DeleteBtn';

export const metadata = {
    title: "Brand Page - iSHop",
    description: "Brand Page - Swoo Tech Mart",
};

export default async function BrandsPage() {
    const brandJSON = await getBrands();
    const brandData = brandJSON.brands;

    // console.log(brandJSON.imageURL);
    // console.log(brandData.image_name);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                            <Link
                                href={'/admin'}
                                className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200">
                                <FiChevronLeft className="w-5 h-5 text-slate-600" />
                            </Link>

                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900">Brands</h1>
                                <p className="text-sm text-slate-500 mt-1">Manage brand catalog and visibility</p>
                            </div>
                        </div>

                        <Link
                            href={"/admin/brand/add"}
                            className="inline-flex items-center gap-1 font-bold bg-[#01A49E] text-white text-sm px-4 py-2 rounded-lg shadow hover:cursor-pointer hover:shadow-xl hover:shadow-gray">
                            <FiPlus className="w-4 h-4 font-bold" />
                            <span>Add Brand</span>
                        </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="relative col-span-1 sm:col-span-2">
                            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
                                <FiSearch className="w-5 h-5 text-slate-400" />
                                <input className="ml-3 w-full outline-none text-sm text-slate-700" placeholder="Search Brands, tags or SKU" />
                                <button className="ml-3 inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded text-slate-600 text-sm">
                                    <FiFilter className="w-4 h-4" />
                                    Filters
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                            <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                                <span className="text-slate-500">Sort</span>
                                <div className="border border-slate-200 rounded-lg px-2 py-1 bg-white shadow-sm">
                                    <span className="text-sm">Newest</span>
                                    <FiChevronDown className="inline-block ml-2 w-4 h-4 text-slate-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-800">Brand list</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {brandData?.map((b) => (
                                <article key={b._id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                                            <img src={brandJSON.imageURL + b.image_name} alt={b.name} className="w-12 h-12 object-contain" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-slate-900 capitalize">{b.name}</h3>
                                                    <p className="text-xs text-slate-500 mt-1">{b.description}</p>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between">

                                                <div className="inline-flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex justify-end items-center gap-3">
                                                            <Link href={`/admin/brand/edit/${b._id}`} className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer"><FiEdit /></Link>
                                                            <DeleteData url={`brand/delete/${b._id}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='space-x-2'>
                                        <div className="text-sm font-bold text-slate-900 my-2">Status</div>
                                        <StatusToggle url={`brand/status/${b._id}`} status={b.status} statusType='status' />
                                        <StatusToggle url={`brand/status/${b._id}`} status={b.on_home} statusType='home' />
                                        <StatusToggle url={`brand/status/${b._id}`} status={b.is_best} statusType='best' />
                                        <StatusToggle url={`brand/status/${b._id}`} status={b.is_top} statusType='top' />

                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-6 w-full overflow-x-auto rounded-lg border border-slate-100">
                            <table className="min-w-full bg-white">
                                <thead className="bg-slate-50">
                                    <tr className="text-left text-xs text-slate-500">
                                        <th className="px-4 py-3">Brand</th>
                                        <th className="px-4 py-3">Owner</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-700">
                                    {brandData?.map((b, r) => (
                                        <tr key={r} className="border-t border-slate-100 hover:bg-slate-50">
                                            {/* <span>{brandJSON.imageURL + b.image_name}</span> */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden">
                                                        <img src={brandJSON.imageURL + b.image_name} alt={b.name} className="w-8 h-8 object-contain" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900 capitalize">{b.name}</div>
                                                        {/* <div className="text-xs text-slate-500">{b.name.toLowerCase().replace(/\s+/g, '-')}.com</div> */}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3">{b.owner}</td>
                                            <td className="space-x-2">
                                                {/* Active */}
                                                <StatusToggle url={`brand/status/${b._id}`} status={b.status} statusType='status' />
                                                <StatusToggle url={`brand/status/${b._id}`} status={b.on_home} statusType='home' />
                                                <StatusToggle url={`brand/status/${b._id}`} status={b.is_best} statusType='best' />
                                                <StatusToggle url={`brand/status/${b._id}`} status={b.is_top} statusType='top' />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <Link href={`/admin/brand/edit/${b._id}`} className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer">Edit</Link>
                                                    <DeleteData url={`brand/delete/${b._id}`} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-slate-500">Showing page 1 of 1</div>
                            <div className="inline-flex items-center gap-2">
                                <button className="px-3 py-1 rounded-md bg-white border border-slate-200 text-sm">Previous</button>
                                <button className="px-3 py-1 rounded-md bg-[#01A49E] text-white text-sm">1</button>
                                <button className="px-3 py-1 rounded-md bg-white border border-slate-200 text-sm">Next</button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-8 text-center text-xs text-slate-400">Admin • Brands • © Company 2025</footer>
            </div>
        </div>
    );
}
