'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser, FiShoppingBag, FiMapPin, FiLock } from "react-icons/fi";
import { useSelector } from "react-redux";


const ProfilePage = () => {
    const user = useSelector((state) => state.user.data);
    const [isClientReady, setIsClientReady] = useState(false);

    useEffect(() => {
        setIsClientReady(true);
    }, []);

    // Prevent hydration mismatch
    if (!isClientReady) return null;
    // The server is not “slow”; it simply cannot access client-only data (like Redux state from localStorage) during SSR, so it renders a fallback. When the client immediately has that data, React sees different output during hydration, which causes the mismatch.
    // useEffect works cuz it forces the server render and the first client render to output the same HTML(null), allowing React to hydrate without mismatches. After hydration completes, useEffect runs on the client, enabling the component to safely render Redux - dependent data.

    const fullName = user.name;
    const parts = fullName.trim().split(" ");
    const firstName = parts[0];
    const lastName = parts.splice(1).join(" ");

    return (
        <div className="min-h-auto bg-gray-50 p-6 sm:p-10">
            <div className="max-w-[1300px] mx-auto bg-white rounded-2xl shadow-md flex overflow-hidden">

                {/* Sidebar */}
                <aside className="w-full md:w-1/4 border-r border-slate-200 p-6">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQxIRR4lOFg0rzwSnFVuQE1aWcJRO03-TpA&s"
                            alt="Profile"
                            className="w-28 h-28 rounded-xl object-cover shadow-lg"
                        />
                        <h2 className="mt-4 text-lg font-semibold text-slate-900">
                            {user !== null ? user.name : "Guest"}
                        </h2>
                        <p className="text-sm text-slate-500">{user !== null ? user.email : "guest123@gmail.com"}</p>
                    </div>

                    <div className="mt-8 space-y-2">
                        {[
                            { label: "Account info", icon: <FiUser />, active: true },
                            { label: "My order", icon: <FiShoppingBag /> },
                            { label: "My address", icon: <FiMapPin /> },
                            { label: "Change password", icon: <FiLock /> },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition hover:cursor-pointer
                ${item.active
                                        ? "bg-[#01A49E] text-white shadow-sm"
                                        : "text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </span>
                                →
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full md:w-3/4 p-8">
                    <header className="mb-8">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Account Info
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Update your personal details and contact information.
                        </p>
                    </header>

                    <form className="max-w-full space-y-5">
                        {/* Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    defaultValue={firstName}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#01A49E] capitalize"
                                    placeholder="First name"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    defaultValue={lastName}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#01A49E] capitalize"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#01A49E]"
                                placeholder="Email address"
                            />
                            <p className="mt-1 text-xs text-slate-400">
                                Used for login and notifications.
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Phone Number <span className="text-slate-400">(Optional)</span>
                            </label>
                            <input
                                defaultValue="+91 1234567890"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#01A49E]"
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>

                        {/* Save */}
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-lg bg-[#01A49E] px-8 py-3
              text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                        >
                            Save Changes
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;