'use client'
import { axiosApiInstance } from '@/helper/helper';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

export default function StatusToggle({ status, statusType, url }) {
    const router = useRouter();
    const getText = () => {
        if (statusType === 'status') return status ? "Active" : "Inactive";
        if (statusType === 'home') return status ? "Home: On" : "Home: Off";
        if (statusType === 'top') return status ? "Top: Yes" : "Top: No";
        if (statusType === 'best') return status ? "Best: Yes" : "Best: No";
        if (statusType === 'featured') return status ? "Featured: Yes" : "Featured: No";
        if (statusType === 'hot') return status ? "Hot: Yes" : "Hot: No";
        if (statusType === 'stock') return status ? "In Stock: Yes" : "In Stock: No";
        return status ? "Active" : "Inactive"
    }

    const statusToggler = () => {
        axiosApiInstance.patch(url, { statusType }).then(
            (response) => {
                toast.success(response.data.msg);
                router.refresh();
            }
        ).catch(
            (error) => {
                toast.warning(error.response.data.msg);
            }
        )
    }

    return (
        <>
            <button onClick={statusToggler}
                className={`px-3 py-1 text-xs rounded-full hover:cursor-pointer font-medium ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-600'}`}
            >
                {getText()}
            </button>

            {/* <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner transition-colors"></div>
                    <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform transform translate-x-0.5"></div>
                </div> */}
        </>
    )
}
