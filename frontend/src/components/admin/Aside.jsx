// components/AdminSidebar.jsx
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaChartLine, FaCog, FaTags } from "react-icons/fa";
import Link from "next/link";

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen hidden md:flex flex-col">
            <div className="p-6 text-2xl font-bold text-gray-800">TechMart</div>

            <nav className="mt-6 flex-1 px-4 space-y-2">
                <Link
                    href={"/admin"}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaTachometerAlt /> Dashboard
                </Link>

                <Link
                    href={"/admin/category"}
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaTags /> Categories
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaBoxOpen /> Products
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaShoppingCart /> Orders
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaUsers /> Customers
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaChartLine /> Reports
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                    <FaCog /> Settings
                </Link>
            </nav>
        </aside>
    );
}
