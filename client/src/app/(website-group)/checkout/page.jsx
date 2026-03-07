"use client";
import { lstoUser } from "@/redux/reducers/UserReducer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPhone, FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "@/api-calls/user";
import { setShippingAddresses } from "@/redux/reducers/UserReducer";
import Address from "@/components/website/Address";
import EditAddress from "@/components/website/EditAddress";
import DeleteAddress from "@/components/website/DeleteAddress";
import { formatPriceINR } from "@/helper/helper";

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cart);

    const [currentAddress, setCurrentAddress] = useState();
    const [isChecking, setIsChecking] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [paymentMode, setPaymentMode] = useState(1); // 0: COD | 1: Pay Now
    const extra = paymentMode == 0 ? 100 : 0;

    useEffect(() => {
        dispatch(lstoUser());
        setIsChecking(false);
    }, []);

    useEffect(() => {
        setCurrentAddress(user?.data?.default_address);
    }, [user]);

    useEffect(() => {
        if (!isChecking && user.data === null) {
            router.push("/login");
        }
    }, [isChecking, user]);

    useEffect(() => {
        if (user?.data?._id) {
            getAddresses(user.data._id).then(addresses => {
                if (addresses) dispatch(setShippingAddresses(addresses));
            });
        }
    }, [user?.data?._id]);

    const handleEditClick = (index) => {
        setSelectedIndex(index);
        setEditModal(true);
    };

    const handleDeleteClick = (index) => {
        setSelectedIndex(index);
        setDeleteModal(true);
    };

    const placeOrderHandler = () => {
        
    }

    return (
        <div className="min-h-screen w-full bg-white py-6 px-4 sm:px-6 md:px-8 lg:px-10 my-3 rounded-xl">
            <div className="max-w-[1300px] mx-auto rounded-xl shadow-lg p-4 sm:p-6 md:p-8 bg-white">
                <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    CHECKOUT
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">

                    {/* LEFT SIDE */}
                    <div className="md:col-span-2">

                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-xl">
                            <FiPhone className="text-[#01A49E]" />
                            Shipping Address
                        </h2>

                        {user?.data?.shipping_address?.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 md:p-10 text-center bg-[#f9fafb]">
                                <div className="flex justify-center mb-4 sm:mb-6">
                                    <div className="bg-[#01A49E]/20 p-4 sm:p-5 rounded-full">
                                        <FiPhone className="text-[#01A49E] text-2xl sm:text-3xl" />
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-xl font-semibold text-gray-900">
                                    No Shipping Address Found
                                </h3>
                                <p className="text-sm sm:text-base md:text-base text-gray-600 mt-2 sm:mt-3 max-w-md mx-auto">
                                    You haven't added any shipping address yet. Please add one to continue with checkout.
                                </p>
                            </div>
                        ) : (
                            user?.data?.shipping_address?.map((add, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setCurrentAddress(idx)}
                                    className={`relative border rounded-lg p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 cursor-pointer
                                        ${idx === currentAddress
                                            ? "border-[#01A49E] bg-[#E6FFFA]"
                                            : "border-gray-300 bg-white"
                                        } shadow-sm hover:shadow-md transition`}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <input
                                            type="radio"
                                            name="default_address"
                                            checked={idx === currentAddress}
                                            className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#01A49E] border-gray-300 cursor-pointer"
                                            style={{ accentColor: '#01A49E' }}
                                            readOnly
                                        />

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-base">{add.name}</span>
                                                {idx === user?.data?.default_address && (
                                                    <span className="bg-[#01A49E] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full select-none">
                                                        Default
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base md:text-base">
                                                {add.addressLine2}, {add.addressLine1}
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base md:text-base mt-1">
                                                {add.city}, {add.state}, {add.countryCode}
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base md:text-base mt-1">
                                                {add.postalCode}
                                            </p>

                                            <div className="flex items-center gap-2 mt-2 sm:mt-3 text-sm sm:text-base md:text-base text-gray-700">
                                                <FiPhone className="inline-block" />
                                                {add.contact}
                                            </div>
                                        </div>
                                    </div>

                                    {/* EDIT / DELETE BUTTONS */}
                                    <div className="flex ms-7 sm:ms-9 mt-2 gap-2 sm:gap-3">
                                        <button
                                            onClick={() => handleEditClick(idx)}
                                            className="text-gray-500 hover:text-[#01A49E] transition hover:cursor-pointer"
                                            aria-label="Edit Address"
                                        >
                                            <FiEdit size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteClick(idx)}
                                            className="text-gray-500 hover:text-red-500 transition hover:cursor-pointer"
                                            aria-label="Delete Address"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-4 sm:mt-6 w-full bg-[#01A49E] text-white rounded-md py-2.5 sm:py-3 font-semibold hover:bg-[#018f8a] transition"
                        >
                            + Add New Address
                        </button>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="h-fit bg-white border rounded-lg p-4 sm:p-6 md:p-8 sticky top-4 shadow-md mt-6 md:mt-0">

                        <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                            {cart?.data?.length === 1 ? 'Your Order' : 'Your Orders'}
                        </h3>

                        <div className="max-h-52 sm:max-h-60 overflow-y-auto space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            {cart?.data?.map((cd, idx) => (
                                <div key={idx} className="flex justify-between text-gray-700 text-sm sm:text-base md:text-base">
                                    <span className="truncate w-[70%] font-medium">
                                        {cd?.name} × {cd?.qty}
                                    </span>
                                    <span className="font-semibold">
                                        ₹{formatPriceINR(Number(cd?.original_price) * Number(cd?.qty))}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-gray-800 text-sm sm:text-base md:text-base mb-1 sm:mb-2">
                            <span>Original Price</span>
                            <span>₹{formatPriceINR(cart?.original_total)}</span>
                        </div>

                        <div className="flex justify-between text-green-600 text-sm sm:text-base md:text-base mb-2 sm:mb-4">
                            <span>Discount</span>
                            <span>-₹{formatPriceINR(cart?.original_total - cart?.final_total)}</span>
                        </div>

                        <div className="flex justify-between text-red-600 text-sm sm:text-base md:text-base mb-2 sm:mb-4">
                            <span>Shipping Charges</span>
                            <span>-₹{formatPriceINR(extra)}</span>
                        </div>

                        <div className="border-t pt-3 sm:pt-4 flex justify-between font-semibold text-base sm:text-lg md:text-lg mb-4 sm:mb-6 text-[#01A49E]">
                            <span>Total</span>
                            <span>₹{formatPriceINR(cart?.final_total)}</span>
                        </div>

                        {/* Payment Mode */}
                        <div className="mb-4 sm:mb-6">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base sm:text-lg md:text-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 sm:h-6 sm:w-6 text-[#01A49E]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                                </svg>
                                Payment Method
                            </h4>
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <label className={`border rounded-lg p-3 cursor-pointer flex flex-col ${paymentMode === 0 ? 'border-[#01A49E] bg-[#E6FFFA]' : 'border-gray-300 bg-white'} hover:shadow-md transition`}>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <input type="radio" name="payment_mode" value='0' checked={paymentMode === 0} onChange={() => setPaymentMode(0)} className="h-4 w-4 sm:h-5 sm:w-5 accent-[#01A49E] cursor-pointer" />
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-base">Cash on Delivery</span>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-sm text-gray-600 ml-6 sm:ml-8 mt-1">Pay when you receive</p>
                                </label>

                                <label className={`border rounded-lg p-3 cursor-pointer flex flex-col ${paymentMode === 1 ? 'border-[#01A49E] bg-[#E6FFFA]' : 'border-gray-300 bg-white'} hover:shadow-md transition`}>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <input type="radio" name="payment_mode" value='1' checked={paymentMode === 1} onChange={() => setPaymentMode(1)} className="h-4 w-4 sm:h-5 sm:w-5 accent-[#01A49E] cursor-pointer" />
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-base">Pay Now</span>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-sm text-gray-600 ml-6 sm:ml-8 mt-1">Secure online payment</p>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={placeOrderHandler}
                            className="w-full bg-[#01A49E] text-white py-2.5 sm:py-3 rounded-md font-semibold hover:bg-[#018f8a] transition text-sm sm:text-base md:text-base">
                            {paymentMode == 0 ? 'PLACE ORDER' : 'PROCEED TO PAYMENT'}
                            {/* 0: cod | 1: online */}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Address isOpen={showModal} onClose={() => setShowModal(false)} />
            <EditAddress isOpen={editModal} onClose={() => setEditModal(false)} addressIndex={selectedIndex} />
            <DeleteAddress isOpen={deleteModal} onClose={() => setDeleteModal(false)} addressIndex={selectedIndex} />
        </div>
    );
}