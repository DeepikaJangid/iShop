'use client'
import { addToCart, changeQuantity } from "@/redux/reducers/CartReducer";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { lsToCart } from "@/redux/reducers/CartReducer";
import { axiosApiInstance } from "@/helper/helper";

export default function AddToCartButton(props) {
    //props mein yeh hai =  {id, imageURL, name, final_price, original_price } //props aa rhe hai card wale page se and card wale page ke pass productListing page se data aa raha hai.

    const dispatcher = useDispatch();
    // In Redux, a dispatcher (usually called dispatch) is the mechanism to send actions to the Redux store. Actions are plain JavaScript objects that describe what happened, and the store’s reducers decide how the state should change based on that action. Think of dispatch like telling Redux: “Hey, this just happened, update the store accordingly.”
    // const clickHandler = () => {
    //     dispatcher(addToCart(props)); //fir props ka data yaha se cartReducer ke pass jayega 
    // }

    const { data: cart_data } = useSelector(state => state.cart);
    const itemFound = cart_data.find((cd) => cd.id == props.id); // include works on array not on array of objects if we use cart_pIds.include(props.id). it wont' work on array of objects. that's why find is used here.
    // find returns object from an array.

    const user = useSelector((store) => store.user);

    const decHandler = () => {
        if (user?.data) {
            const newQty = itemFound.qty - 1;
            axiosApiInstance.post("/cart/update-quantity", {
                user_id: user.data._id,
                product_id: props.id,
                quantity: newQty
            }).then((response) => {
                if (response.data.flag == 1) {
                    let final_total = 0, original_total = 0;
                    const cartData = response?.data?.finalCart?.map(
                        (cart_item) => {
                            final_total += cart_item.quantity * cart_item.product_id.final_price;
                            original_total += cart_item.quantity * cart_item.product_id.original_price;
                            return {
                                id: cart_item.product_id._id,
                                qty: cart_item.quantity,
                                name: cart_item.product_id.name,
                                imageURL: process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL +
                                    "main_images/" + cart_item.product_id.thumbnail,
                                original_price: cart_item.product_id.original_price,
                                final_price: cart_item.product_id.final_price,
                            }
                        }
                    )
                    localStorage.setItem("cart", JSON.stringify({
                        data: cartData,
                        original_total,
                        final_total
                    }));
                    dispatcher(lsToCart());
                }
            });
        } else {
            dispatcher(changeQuantity({ ...props, flag: 0 }));
        }
    }

    const incHandler = () => {
        if (user?.data) {
            const newQty = itemFound.qty + 1;
            axiosApiInstance.post("/cart/update-quantity", {
                user_id: user.data._id,
                product_id: props.id,
                quantity: newQty
            }).then((response) => {
                if (response.data.flag == 1) {
                    let final_total = 0, original_total = 0;
                    const cartData = response?.data?.finalCart?.map(
                        (cart_item) => {
                            final_total += cart_item.quantity * cart_item.product_id.final_price;
                            original_total += cart_item.quantity * cart_item.product_id.original_price;
                            return {
                                id: cart_item.product_id._id,
                                qty: cart_item.quantity,
                                name: cart_item.product_id.name,
                                imageURL: process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL +
                                    "main_images/" + cart_item.product_id.thumbnail,
                                original_price: cart_item.product_id.original_price,
                                final_price: cart_item.product_id.final_price,
                            }
                        }
                    )
                    localStorage.setItem("cart", JSON.stringify({
                        data: cartData,
                        original_total,
                        final_total
                    }));

                    dispatcher(lsToCart());
                }
            });
        } else {
            dispatcher(changeQuantity({ ...props, flag: 1 }));
        }
    }

    const addProductToCart = () => {
        if (user?.data) {
            axiosApiInstance.post("/cart/add-item", {
                user_id: user.data._id,
                product_id: props.id,
                quantity: 1
            }).then((response) => {
                if (response.data.flag === 1) {
                    let final_total = 0, original_total = 0;
                    const cartData = response.data.finalCart.map(cart_item => {
                        final_total += cart_item.quantity * cart_item.product_id.final_price;
                        original_total += cart_item.quantity * cart_item.product_id.original_price;
                        return {
                            id: cart_item.product_id._id,
                            qty: cart_item.quantity,
                            name: cart_item.product_id.name,
                            imageURL: process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL + "main_images/" + cart_item.product_id.thumbnail,
                            original_price: cart_item.product_id.original_price,
                            final_price: cart_item.product_id.final_price,
                        };
                    });
                    localStorage.setItem("cart", JSON.stringify({ data: cartData, original_total, final_total }));
                    dispatcher(lsToCart());
                }
            });
        } else {
            dispatcher(addToCart(props)); // guest
        }
    }
    return (
        <>
            {
                itemFound != null //redux mein jo data hai uski id ko props.id se match karenge... agar match karti hai to quantity increase ya decrease kr denge. aur data redux mein nahi hai to add to cart ka button show kr denge.
                    ? <div className="flex gap-4 items-center">
                        <button
                            onClick={decHandler}
                            className="flex items-center justify-center w-10 h-10 bg-[#01A49E] text-white font-semibold rounded hover:bg-[#019188] transition hover:cursor-pointer"
                        > - </button>
                        {/* Quantity Display */}
                        <span className="w-8 text-center font-semibold text-[#333]">{itemFound.qty}</span>
                        <button
                            onClick={incHandler}
                            className="flex items-center justify-center w-10 h-10 bg-[#01A49E] text-white font-semibold rounded hover:bg-[#019188] transition hover:cursor-pointer"
                        > + </button>
                    </div>
                    : <button
                        onClick={addProductToCart}
                        className={`w-full flex items-center justify-center gap-2 bg-[#01A49E] text-white font-semibold py-2 px-3 rounded hover:bg-[#019188] transition hover:cursor-pointer`}
                    >
                        <FaCartPlus /> Add to Cart
                    </button>
                // 
            }
        </>
    );
}
