import React from "react";
import {
    FiSearch,
    FiFilter,
    FiPlus,
    FiDownload,
    FiUpload,
    FiGrid,
    FiList,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

export default function ModernColorPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white/60 p-8">
            <div className="max-w-7xl mx-auto">

                {/* TOP BAR */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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

                        <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 hover:cursor-pointer shadow">
                            <FiPlus /> Add Color
                        </button>
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

                    {/* CARD */}
                    <article className="bg-white rounded-2xl shadow-md border overflow-hidden group">
                        <div className="h-40 w-full" style={{ background: "linear-gradient(180deg, #FF6B6B, #FF0000)" }} />
                        <div className="p-4">

                            {/* NAME + STATUS */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Crimson</h3>
                                    <div className="text-xs text-gray-500 mt-1">#DC143C</div>
                                </div>

                                <div className="px-2 py-1 rounded-md text-xs bg-green-100 text-green-600 font-medium">
                                    Active
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="mt-4 flex items-center gap-3">
                                <button className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"><FiEdit2 /></button>
                                <button className="p-2 rounded-md text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                            </div>

                        </div>
                    </article>

                    {/* CARD */}
                    <article className="bg-white rounded-2xl shadow-md border overflow-hidden">
                        <div className="h-40 w-full" style={{ background: "linear-gradient(180deg, #4F46E5, #3730A3)" }} />
                        <div className="p-4">

                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Indigo Night</h3>
                                    <div className="text-xs text-gray-500 mt-1">#4F46E5</div>
                                </div>

                                <div className="px-2 py-1 rounded-md text-xs bg-green-100 text-green-600 font-medium">
                                    Active
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"><FiEdit2 /></button>
                                <button className="p-2 rounded-md text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                            </div>

                        </div>
                    </article>

                    {/* CARD */}
                    <article className="bg-white rounded-2xl shadow-md border overflow-hidden">
                        <div className="h-40 w-full" style={{ background: "#00C853" }} />
                        <div className="p-4">

                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Emerald</h3>
                                    <div className="text-xs text-gray-500 mt-1">#00C853</div>
                                </div>

                                <div className="px-2 py-1 rounded-md text-xs bg-green-100 text-green-600 font-medium">
                                    Active
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"><FiEdit2 /></button>
                                <button className="p-2 rounded-md text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                            </div>

                        </div>
                    </article>

                    {/* CARD */}
                    <article className="bg-white rounded-2xl shadow-md border overflow-hidden">
                        <div className="h-40 w-full" style={{ background: "linear-gradient(180deg, #FFF7ED, #FFE7CC)" }} />
                        <div className="p-4">

                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Soft Peach</h3>
                                    <div className="text-xs text-gray-500 mt-1">#FFE7CC</div>
                                </div>

                                <div className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-600 font-medium">
                                    Inactive
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"><FiEdit2 /></button>
                                <button className="p-2 rounded-md text-red-600 hover:bg-red-50"><FiTrash2 /></button>
                            </div>

                        </div>
                    </article>

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
        </div>
    );
}
