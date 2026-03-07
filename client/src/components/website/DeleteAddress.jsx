"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "@/api-calls/user";
import { setShippingAddresses } from "@/redux/reducers/UserReducer";

export default function DeleteAddress({ isOpen, onClose, addressIndex }) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    if (!isOpen) return null;

    const handleDelete = async () => {
        const updatedAddresses = await deleteAddress(
            user.data._id,
            addressIndex
        );

        if (updatedAddresses) {
            dispatch(setShippingAddresses(updatedAddresses));
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">

                <h2 className="text-lg font-semibold text-gray-800">
                    Delete Address
                </h2>

                <p className="text-sm text-gray-500 mt-3">
                    Are you sure you want to delete this address?
                    This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg hover:cursor-pointer">
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer">
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}