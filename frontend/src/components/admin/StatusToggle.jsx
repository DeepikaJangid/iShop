'use client'
import React from 'react'

export default function StatusToggle({ status }) {
    const StatusToggler = (status) => {
        !status
        // console.log(status)
    }
    return (
        <>
            {/* <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner transition-colors"></div>
                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform transform translate-x-0.5"></div>
            </div> */}


            <span onClick={StatusToggler}
                className={`px-3 py-1 text-sm font-medium rounded-full ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-600'}`}
            >
                {status ? "Active" : "Inactive"}
                {/* {status == "home" ? "Yes" : "No"}
                {status == "top" ? "Yes" : "No"}
                {status == "best" ? "Yes" : "No"} */}
            </span>
        </>
    )
}
