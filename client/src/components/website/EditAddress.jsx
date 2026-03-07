"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "@/api-calls/user";
import { setShippingAddresses } from "@/redux/reducers/UserReducer";

export default function EditAddress({ isOpen, onClose, addressIndex }) {
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

    // Pre-fill form when modal opens
    useEffect(() => {
        if (isOpen && user?.data?.shipping_address[addressIndex]) {
            setFormData(user.data.shipping_address[addressIndex]);
        }
    }, [isOpen, addressIndex]);

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

        const updatedAddresses = await updateAddress(
            user.data._id,
            addressIndex,
            formData
        );

        if (updatedAddresses) {
            dispatch(setShippingAddresses(updatedAddresses));
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">

                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">Edit Address</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    <input name="name" value={formData.name} onChange={handleChange}
                        className="w-full border p-3 rounded-lg" required />

                    <input name="addressLine1" value={formData.addressLine1} onChange={handleChange}
                        className="w-full border p-3 rounded-lg" required />

                    <input name="addressLine2" value={formData.addressLine2} onChange={handleChange}
                        className="w-full border p-3 rounded-lg" />

                    <div className="grid md:grid-cols-2 gap-4">
                        <input name="city" value={formData.city} onChange={handleChange}
                            className="border p-3 rounded-lg" required />

                        <input name="state" value={formData.state} onChange={handleChange}
                            className="border p-3 rounded-lg" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input name="postalCode" value={formData.postalCode} onChange={handleChange}
                            className="border p-3 rounded-lg" required />

                        <input name="countryCode" value={formData.countryCode} onChange={handleChange}
                            className="border p-3 rounded-lg" required />
                    </div>

                    <input name="contact" value={formData.contact} onChange={handleChange}
                        className="w-full border p-3 rounded-lg" />

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={onClose}
                            className="px-5 py-2 border rounded-lg hover:cursor-pointer">
                            Cancel
                        </button>

                        <button type="submit"
                            className="px-6 py-2 bg-[#01A49E] text-white rounded-lg hover:cursor-pointer">
                            Update Address
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}