'use client'
import { FaShoppingCart } from 'react-icons/fa';

export default function AddToCartButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 bg-[#01A49E] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
            <FaShoppingCart className="text-white" />
            Add to Cart
        </button>
    );
}
