import React from "react";
import { FiSearch, FiFilter, FiPlus, FiDownload, FiUpload, FiGrid, FiList, FiEdit2, FiTrash2, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { getColors } from "@/api-calls/colors";
import StatusToggle from "@/components/admin/StatusToggle";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function ModernColorPage() {
    const colorsJSON = await getColors();
    const colors = colorsJSON.colors;

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white/60 p-8">
            <div className="max-w-7xl mx-auto">

                {/* TOP BAR */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                        <Link
                            href={'/admin/'}
                            className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm active:bg-gray-200">
                            <FiChevronLeft className="w-5 h-5 text-slate-600" />
                        </Link>

                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Colors</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Curate the palette for your catalog — upload swatches or add refined shades.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                                <FiSearch className="text-gray-400" />
                                <input className="w-56 text-sm outline-none placeholder-gray-400" placeholder="Search colors or hex" />
                            </div>

                            <button className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm hover:shadow">
                                <FiFilter /> Filters
                            </button>

                            <Link href={"/admin/colors/add"} className="inline-flex items-center gap-2 bg-[#01A49E] text-white px-4 py-2 rounded-lg hover:cursor-pointer shadow font-bold">
                                <FiPlus className="font-bold" /> Add Color
                            </Link>
                        </div>
                    </div>
                </header>

                {/* METRICS */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border">
                        <div className="text-xs text-gray-400">Total Colors</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-2">128</div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border">
                        <div className="text-xs text-gray-400">Active</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-2">102</div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border">
                        <div className="text-xs text-gray-400">Inactive</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-2">26</div>
                    </div>
                </section>

                {/* VIEW CONTROLS */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        Showing <span className="bg-white border px-2 py-1 rounded-lg">All</span>
                        <span className="text-gray-400">•</span> Sorted by newest
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:shadow"><FiGrid /></button>
                        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:shadow"><FiList /></button>
                    </div>
                </div>

                {/* COLOR CARDS GRID */}
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

                    {
                        colors.map(
                            (clr) => {
                                return (
                                    <article key={clr._id} className="bg-white rounded-2xl shadow-md border overflow-hidden group hover:cursor-pointer">
                                        <div className="h-40 w-full" style={{ background: clr.code }} />
                                        <div className="p-4">

                                            {/* NAME + STATUS */}
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900 capitalize">{clr.name}</h3>
                                                    <div className="text-xs text-gray-500 mt-1">{clr.code}</div>
                                                </div>

                                                <StatusToggle url={`colors/status/${clr._id}`} status={clr.status} statusType='status' />
                                            </div>

                                            {/* ACTIONS */}
                                            <div className="mt-4 flex items-center gap-3">
                                                <Link href={`/admin/colors/edit/${clr._id}`} className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"><FiEdit2 /></Link>
                                                {/* <button "><FiTrash2 /></button> */}
                                                <DeleteBtn url={`/colors/delete/${clr._id}`} />
                                            </div>

                                        </div>
                                    </article>
                                )
                            }
                        )
                    }
                    {/* CARD */}


                    {/* Add more cards as needed */}
                </section>

                {/* PAGINATION */}
                {/* <footer className="mt-6 flex items-center justify-between text-sm text-gray-500">
                    <div>Showing 1–8 of 128 colors</div>
                    <div className="inline-flex items-center gap-3">
                        <button className="px-3 py-1 border rounded-lg bg-white">Prev</button>
                        <div className="px-3 py-1 border rounded-lg bg-white">1</div>
                        <div className="px-3 py-1 border rounded-lg bg-white">2</div>
                        <div className="px-3 py-1 border rounded-lg bg-white">3</div>
                        <button className="px-3 py-1 border rounded-lg bg-white">Next</button>
                    </div>
                </footer> */}

            </div>
        </div >
    );
}
