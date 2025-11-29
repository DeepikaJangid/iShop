// 'use client';
import { getCategories } from "@/api-calls/category";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaTag } from "react-icons/fa";
import StatusToggle from "@/components/admin/StatusToggle";
import Link from "next/link";
import DeleteData from "@/components/admin/DeleteBtn";

export default async function AdminCategoryPage() {
    const categoriesDataJSON = await getCategories();
    const categoriesData = categoriesDataJSON.categories;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-7 lg:10">

            {/* Dashboard Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1">
                    <h3 className="text-gray-500 text-sm font-medium">Total Categories</h3>
                    <p className="text-3xl font-extrabold text-gray-900 mt-2">125</p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1">
                    <h3 className="text-gray-500 text-sm font-medium">Active</h3>
                    <p className="text-3xl font-extrabold text-green-600 mt-2">98</p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1">
                    <h3 className="text-gray-500 text-sm font-medium">Featured</h3>
                    <p className="text-3xl font-extrabold text-indigo-600 mt-2">35</p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1">
                    <h3 className="text-gray-500 text-sm font-medium">On Home</h3>
                    <p className="text-3xl font-extrabold text-purple-600 mt-2">21</p>
                </div>
            </div>

            {/* Header + Add Button */}
            <div className="flex-col md:flex md:flex-row justify-between items-center mb-8">
                <div className="">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Manage Categories</h1>
                    <p className="text-gray-500">Quickly update, feature, or toggle your categories in one place.</p>
                </div>
                <Link href={'/admin/category/add'}
                    className="flex items-center gap-2 bg-linear-to-r from-[#01A49E] to-[#00C9B7] text-white px-6 py-3 rounded-full shadow-lg hover:cursor-pointer hover:from-[#00C9B7] hover:to-[#01A49E] transition transform hover:-translate-y-1 mt-3 md:mt-0">
                    <FaPlus /> Add Category
                </Link>
            </div>

            {/* Search */}
            <div className="mb-8 relative w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-gray-400 text-gray-900"
                />
                <FaSearch className="absolute right-4 top-3 text-gray-400 text-lg" />
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    categoriesData.map(
                        (cat) => {
                            return (
                                <div key={cat._id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-4">

                                        <div className="flex items-center gap-3">
                                            <FaTag className="text-[#01A49E] text-2xl" />
                                            <h2 className="text-xl font-semibold text-gray-900">{cat.name}</h2>
                                        </div>

                                        {/* Image Section */}

                                        <div className="w-25 h-20 mb-4">
                                            <img
                                                src={categoriesDataJSON.imageURL + cat.image_name}
                                                alt={cat.name}
                                                className="object-contain w-full h-full rounded-xl shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-gray-500 mb-4">Slug: <span className="text-gray-900 font-medium lowercase">{cat.slug}</span></p>

                                    {/* Toggle Switches */}
                                    {/* <div className="flex items-center gap-6 mb-4"> */}
                                    <label className="flex items-center flex-wrap gap2 md:gap-2 cursor-pointer mb-4">
                                        <StatusToggle url={`category/status/${cat._id}`} status={cat.status} statusType='status' />
                                        <StatusToggle url={`category/status/${cat._id}`} status={cat.on_home} statusType='home' />
                                        <StatusToggle url={`category/status/${cat._id}`} status={cat.is_best} statusType='best' />
                                        <StatusToggle url={`category/status/${cat._id}`} status={cat.is_top} statusType='top' />
                                    </label>
                                    {/* </div> */}

                                    {/* Action Icons */}
                                    <div className="flex justify-end items-center gap-3">
                                        <Link href={`/admin/category/edit/${cat._id}`} className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer"><FaEdit /></Link>
                                        <DeleteData url={`category/delete/${cat._id}`} />
                                        {/* <button className="text-gray-600 hover:text-gray-800 transition"><FaEye /></button> */}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}
