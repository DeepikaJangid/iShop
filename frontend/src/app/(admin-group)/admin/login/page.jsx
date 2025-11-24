// "use client";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function AdminLogin() {
    return (
        <div className="mt-10 flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                {/* LOGO */}
                <div className="flex justify-center mb-6">
                    <h1 className="font-bold text-md md:text-lg tracking-wide leading-3.5 uppercase">Swoo Tech Mart Admin</h1>
                </div>

                {/* LOGIN FORM */}
                <form className="space-y-6">
                    {/* Email / Username */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Username
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <span className="px-3 text-gray-500">
                                <FaUserAlt />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter username"
                                className="flex-1 p-2 text-gray-700 outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <span className="px-3 text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="flex-1 p-2 text-gray-700 outline-none"
                            />
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end">
                        <a href="#" className="text-blue-600 hover:underline text-sm">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Log In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Social login placeholders */}
                <div className="flex gap-4 justify-center">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 transition">
                        Google
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 transition">
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="text-gray-400 text-center text-sm mt-6">
                    © 2025 TechStore Admin. All rights reserved.
                </p>
            </div>
        </div>
    );
}
