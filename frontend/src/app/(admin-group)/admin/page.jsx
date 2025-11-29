'use client';
import Link from "next/link";
import { FaDollarSign, FaShoppingBag, FaBox, FaUsers, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
    return (
        <div className="flex-1 bg-gray-50 p-8">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-semibold text-gray-900 tracking-wide">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Your overview of products, orders, and sales.</p>
                </div>

                <img src="https://media.tenor.com/uQSzEsNIZkIAAAAm/blackpink-eating.webp" alt="" />
                <img src="https://media1.tenor.com/m/UFpi4Wt4JRwAAAAd/awoo-cat-baby-cat.gif" className="h-[199px] w-[200px] rounded-full object-contain" alt="" />

                <div className="flex items-center gap-6">
                    <Link href={"/admin"} className="bg-linear-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition transform flex items-center hover:cursor-pointer">
                        <FaBox className="mr-2" /> Add Product
                    </Link>
                    <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition transform hover:scale-105 flex items-center hover:cursor-pointer">
                        <FaCog className="mr-2" /> Settings
                    </button>
                </div>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="bg-linear-to-r from-teal-400 to-teal-600 p-4 rounded-full text-white">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Revenue</p>
                        <h2 className="text-3xl font-semibold text-gray-900">$45,320</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="bg-linear-to-r from-green-400 to-green-600 p-4 rounded-full text-white">
                        <FaShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">New Orders</p>
                        <h2 className="text-3xl font-semibold text-gray-900">198</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="bg-linear-to-r from-yellow-400 to-yellow-600 p-4 rounded-full text-white">
                        <FaBox size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Products</p>
                        <h2 className="text-3xl font-semibold text-gray-900">1,325</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="bg-linear-to-r from-purple-400 to-purple-600 p-4 rounded-full text-white">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Customers</p>
                        <h2 className="text-3xl font-semibold text-gray-900">5,432</h2>
                    </div>
                </div>
            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Product</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((order) => (
                                <tr key={order} className="hover:bg-gray-50 transition duration-300">
                                    <td className="p-4 text-gray-700">#T100{order}</td>
                                    <td className="p-4 text-gray-900">Jennie</td>
                                    <td className="p-4 text-gray-700">Wireless Headphones</td>
                                    <td className="p-4 text-gray-700">$120</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-md">
                                            Paid
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CHARTS & GRAPHS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                {/* Placeholder for charts */}
                <div className="bg-white p-8 rounded-xl shadow-lg flex items-center justify-center h-72 text-gray-400">
                    <p className="text-4xl">📈 Sales Over Time</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg flex items-center justify-center h-72 text-gray-400">
                    <p className="text-4xl">📊 Top Selling Products</p>
                </div>
            </div>

            {/* QUICK LINKS / SETTINGS */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex gap-8 mb-10">
                <div className="flex-1 bg-linear-to-r from-teal-400 to-teal-600 p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold">Manage Products</h3>
                    <p className="text-sm mt-4">Add, edit, and remove products from your store.</p>
                    <button className="mt-6 px-6 py-2 bg-white text-teal-600 rounded-full shadow-md hover:bg-teal-50 transition">Go to Products</button>
                </div>

                <div className="flex-1 bg-linear-to-r from-purple-400 to-purple-600 p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold">Manage Orders</h3>
                    <p className="text-sm mt-4">View and manage your customer orders.</p>
                    <button className="mt-6 px-6 py-2 bg-white text-purple-600 rounded-full shadow-md hover:bg-purple-50 transition">Go to Orders</button>
                </div>
            </div>
        </div>
    );
}
