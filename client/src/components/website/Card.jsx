import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

export default function Card({ _id, discount_percentage, imageURL, name, final_price, original_price, stock, is_best }) {
    return (
        <div key={_id} className="relative flex flex-col w-[185px] mt-3 mb-2">
            {is_best == true ? <div className="absolute w-fit left-0 right-0 bg-[#1ABA1A] text-white text-[10px] px-2 py-1 rounded uppercase">
                best seller <br />
            </div> : null}

            <img
                src={imageURL}
                alt={name}
                className="object-contain max-h-[185px]"
            />

            <span className="text-center text-[#666666] text-[12px]">(1)</span>

            <span className="font-bold text-[13px] md:text-[14px] mt-2">
                {name}
            </span>

            <p className="text-red-500 font-semibold text-[14px]">
                ₹{final_price}
                <span className="line-through text-[#666666] text-[12px] ml-1">
                    ₹{original_price}
                </span>
            </p>

            {discount_percentage !== 0 && (
                <span className="bg-[#f4fcf4] text-[#1ABA1A] uppercase text-[12px] font-semibold px-2 py-1 rounded w-fit mt-2">
                    Save {discount_percentage}%
                </span>
            )}

            <span className="flex items-center gap-1 text-[12px] mt-2">
                <FaCheckCircle
                    className={`${stock ? "bg-green-500" : "bg-red-500"
                        } text-white rounded-full`}
                />
                {stock ? "In Stock" : "Out of Stock"}
            </span>
        </div>
    )
}
