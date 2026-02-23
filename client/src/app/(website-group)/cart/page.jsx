'use client'
import { FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { formatPriceINR, syncCartFromResponse } from "@/helper/helper";
import { changeQuantity, emptyCart, removeFromCart } from "@/redux/reducers/CartReducer";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { lsToCart } from "@/redux/reducers/CartReducer";
import { axiosApiInstance } from "@/helper/helper";

const CartPage = () => {
    const cartData = useSelector((store => store.cart));
    const cart = cartData.data;
    const dispatcher = useDispatch();
    const router = useRouter();
    const user = useSelector((store) => store.user);

    const checkoutHandler = () => {
        if (user?.data) {
            router.push('/checkout');
        } else {
            router.push('/login?redirect=/checkout');
        }
    }

    const decQuantity = (item) => {
        if (user?.data) {
            const newQty = item.qty - 1;
            axiosApiInstance.post("/cart/update-quantity", {
                user_id: user.data._id,
                product_id: item.id,
                quantity: newQty,
            }).then((response) => {
                syncCartFromResponse(response, dispatcher);
            });
        } else {
            dispatcher(changeQuantity({
                id: item.id,
                final_price: item.final_price,
                original_price: item.original_price,
                flag: 0,
            })
            );
        }
    }

    const incQuantity = (item) => {
        if (user?.data) {
            const newQty = item.qty + 1;
            axiosApiInstance.post("/cart/update-quantity", {
                user_id: user.data._id,
                product_id: item.id,
                quantity: newQty,
            }).then((response) => {
                syncCartFromResponse(response, dispatcher);
            });
        } else {
            dispatcher(changeQuantity({
                id: item.id,
                final_price: item.final_price,
                original_price: item.original_price,
                flag: 1,
            })
            );
        }
    }

    const removeProduct = (item) => {
        if (user?.data) {
            axiosApiInstance.post("/cart/remove-item", {
                user_id: user.data._id,
                product_id: item.id,
            }).then((response) => {
                syncCartFromResponse(response, dispatcher);
            });
        } else {
            dispatcher(removeFromCart(item));
        }
    }

    const emptyCartHandler = () => {
        if (user?.data) {
            axiosApiInstance.delete(`/cart/empty/${user.data._id}`)
                .then(response => {
                    if (response.data.flag === 1) {
                        dispatcher(emptyCart());  // clear Redux store
                        localStorage.removeItem('cart');  // clear localStorage
                    }
                })
                .catch(error => {
                    console.error("Failed to empty cart:", error);
                });
        } else {
            dispatcher(emptyCart());
            localStorage.removeItem('cart');
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {
                        cart.length === 0
                            ?
                            <div className="text-center">
                                <h2 className="capitalize text-2xl text-gray-700">your cart is empty.</h2>
                            </div>
                            :
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl p-6 flex gap-6 items-center shadow-sm"
                                >
                                    <div className="relative">
                                        <span className="absolute -top-2 -left-2 bg-[#01A49E] text-white text-xs px-2 py-1 rounded">
                                            {item.badge}
                                        </span>
                                        <img
                                            src={item.imageURL}
                                            alt={item.name}
                                            className="w-28 h-28 object-contain"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">
                                            {item.name}
                                        </h3>
                                        <p className="text-[#01A49E] font-bold mt-1">
                                            ₹{formatPriceINR(item.final_price)}.00
                                        </p>
                                        <span className="text-gray-500 text-[14px] font-bold mt-1">
                                            ₹{formatPriceINR(item.final_price)} * {item.qty} = ₹{formatPriceINR(item.final_price * item.qty)}
                                        </span>

                                        <div className="flex items-center px-1.5 gap-2 mt-4 border border-gray-400 w-fit rounded-lg">
                                            <button
                                                onClick={() => decQuantity(item)}
                                                className="p-2 hover:cursor-pointer text-[14px]"
                                            >
                                                –
                                            </button>

                                            <span className="px-3 text-[13px] font-medium">{item.qty}</span>
                                            <button
                                                onClick={() => incQuantity(item)}
                                                // onClick={() => dispatcher(changeQuantity({
                                                //     id: item.id,
                                                //     final_price: item.final_price,
                                                //     original_price: item.original_price,
                                                //     flag: 1
                                                // }))}
                                                className="p-2 hover:cursor-pointer text-[14px]"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                                            <FiCheck className="text-[#01A49E]" />
                                            In stock
                                        </div>

                                    </div>
                                    <button
                                        // onClick={() => dispatcher(removeFromCart({
                                        //     id: item.id,
                                        //     final_price: item.final_price,
                                        //     original_price: item.original_price,
                                        //     qty: item.qty
                                        // }))}
                                        // onClick={() => removeProduct(item)}
                                        onClick={() => removeProduct(item)}
                                        className="cursor-pointer text-xl text-gray-900 transition-all duration-200 active:filter active:drop-shadow-[0_0_14px_rgba(0,0,0,0.75)]"
                                    >
                                        <FaTimes />
                                    </button>

                                </div>
                            ))
                    }
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl p-6 h-fit border border-[#01A49E] space-y-4">

                    {/* Empty Cart Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={emptyCartHandler}
                            className=" text-xs uppercase font-semibold text-red-600 border border-red-300 px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-red-50 active:scale-95 hover:cursor-pointer">
                            Empty Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <h2 className="text-lg font-semibold">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span className="font-medium">
                                ₹{formatPriceINR(cartData.original_total)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span className="font-medium">
                                ₹{formatPriceINR(cartData.original_total - cartData.final_total)}
                            </span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold text-base">
                            <span>Order Total</span>
                            <span>
                                ₹{formatPriceINR(cartData.final_total)}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={checkoutHandler}
                        className=" w-full mt-6 bg-[#01A49E] text-white py-3 rounded-lg font-medium transition-opacity hover:opacity-90 active:opacity-80 hover:cursor-pointer">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
