"use client";

import { FiHome, FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex">

      {/* Left Accent Panel */}
      <div className="hidden md:flex w-1/3 bg-[#01a49e] relative items-center justify-center">

        {/* Giant Background 404 */}
        <h1 className="text-[220px] font-black text-white/10 select-none">
          404
        </h1>

        {/* Floating Icon Badge */}
        <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl rotate-6 hover:rotate-0 transition duration-500">
          <span className="text-[#01a49e] text-3xl font-bold">!</span>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 relative">

        {/* Subtle Background Text */}
        <h1 className="absolute text-[180px] font-extrabold text-gray-100 -z-10 select-none">
          404
        </h1>

        <div className="max-w-lg">

          <p className="uppercase tracking-[6px] text-sm text-[#01a49e] font-semibold">
            Error
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-4 leading-tight">
            You’ve reached a page that doesn’t exist.
          </h2>

          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            The link may be broken, or the page may have been removed.
            Let’s guide you back to safety.
          </p>

          <div className="flex items-center gap-6 mt-10">

            <a
              href="/"
              className="flex items-center gap-2 bg-[#01a49e] text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              <FiHome />
              Go Home
            </a>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-[#01a49e] font-semibold group"
            >
              Go Back
              <FiArrowRight className="group-hover:translate-x-2 transition duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
