import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo / Brand */}
      <Link href='/' className="flex items-center gap-x-2 lg:gap-x-3">
        <div className='bg-[#01A49E] h-[35px] w-10 md:h-[49px] md:w-[55px] pb-1 flex items-center justify-center rounded-full'>
          {/* <img className='mt-2' src="Vector 1.png" alt="Logo" /> */}
          <span className='rounded-full h-[18px] w-[22px] border-b-2 border-white'></span>
        </div>
        {/* logo img */}
        <p className='font-bold text-[12px] tracking-wide md:text-[14px] leading-5 uppercase'>swoo <br /> tech mart<br />admin panel </p>
      </Link>
      {/* logo */}

      {/* Right Section: user profile / actions */}
      <div className="flex items-center space-x-4">
        {/* Search placeholder */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
          />
        </div>

        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          🔔
        </button>

        {/* User Avatar */}
        <Link href={"/admin/login"} className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
          <FaUserAlt />
        </Link>
      </div>
    </header>
  );
}
