import axios from "axios";
import { lsToCart } from "@/redux/reducers/CartReducer";

function slugGenerator(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, '-')      // spaces → hyphens
        .replace(/[^\w-]+/g, '')     // remove non-alphanumeric
        .replace(/-+/g, '-');        // collapse multiple hyphens
}

const axiosApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

const formatPriceINR = (price) => {
    return Number(price).toLocaleString('en-IN');
};

const syncCartFromResponse = (response, dispatcher) => {
    if (response?.data?.flag === 1) {
        let final_total = 0;
        let original_total = 0;
        const cartData = response.data.finalCart.map((cart_item) => {
            final_total += cart_item.quantity * cart_item.product_id.final_price;
            original_total += cart_item.quantity * cart_item.product_id.original_price;
            return {
                id: cart_item.product_id._id,
                qty: cart_item.quantity,
                name: cart_item.product_id.name,
                imageURL:
                    process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL +
                    "main_images/" +
                    cart_item.product_id.thumbnail,
                original_price: cart_item.product_id.original_price,
                final_price: cart_item.product_id.final_price,
            };
        });
        localStorage.setItem(
            "cart",
            JSON.stringify({
                data: cartData,
                original_total,
                final_total,
            })
        );
        dispatcher(lsToCart());
    }
};

export { slugGenerator, axiosApiInstance, isValidPassword, formatPriceINR, syncCartFromResponse }