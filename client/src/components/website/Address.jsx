"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "@/api-calls/user";
import { setShippingAddresses } from "@/redux/reducers/UserReducer";

export default function Address({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const [formData, setFormData] = useState({
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        countryCode: "",
        contact: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedAddresses = await addAddress(user.data._id, formData);

        if (updatedAddresses) {
            dispatch(setShippingAddresses(updatedAddresses));
            onClose();
            setFormData({
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
                countryCode: "",
                contact: "",
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add New Address
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-gray-600 text-xl font-bold hover:cursor-pointer">
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">
                            Full Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                            required
                        />
                    </div>

                    {/* Address Lines */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">
                                Address Line 1
                            </label>
                            <input
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">
                                Address Line 2
                            </label>
                            <input
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                            />
                        </div>
                    </div>

                    {/* City / State */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">
                                City
                            </label>
                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">
                                State / Province
                            </label>
                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Postal / Country */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 block mb-1">
                                Postal Code
                            </label>
                            <input
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-1">
                                Country Code
                            </label>
                            <input
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                placeholder="CA / GB / US"
                                className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-600 block mb-1">
                            Phone Number
                        </label>
                        <input
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="+91 1234567890"
                            className="w-full border border-gray-300 focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/20 outline-none p-3 rounded-lg transition"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition hover:cursor-pointer">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#01A49E] text-white rounded-lg hover:bg-[#018d88] transition shadow-md hover:cursor-pointer">
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}