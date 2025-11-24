'use client'
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaChartLine, FaCog, FaTags } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
        { label: "Categories", icon: <FaTags />, path: "/admin/category" },
        { label: "Products", icon: <FaBoxOpen />, path: "/admin/products" },
        { label: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
        { label: "Customers", icon: <FaUsers />, path: "/admin/customers" },
        { label: "Reports", icon: <FaChartLine />, path: "/admin/reports" },
        { label: "Settings", icon: <FaCog />, path: "/admin/settings" },
    ];

    const linkClass = (path) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition
        ${pathname === path
            ? "bg-[#01A49E] text-white font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen hidden md:flex flex-col">
            <div className="p-6 text-2xl font-bold text-gray-800">TechMart</div>

            <nav className="mt-6 flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link key={item.path} href={item.path} className={linkClass(item.path)}>
                        {item.icon} {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
