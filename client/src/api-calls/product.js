import { axiosApiInstance } from "@/helper/helper";

const getProducts = async (searchparams = {}) => {
    try {
        const query = new URLSearchParams(); //JS inbuilt function to create a new query.
        if (searchparams.status !== undefined) { //if searchparams mein status aaya hai to
            query.append("status", searchparams.status); //jo bhi value aayi hai usko "status" naam se productController par bhej deni hai.
        }
        if (searchparams.home !== undefined) {
            query.append("home", searchparams.home);
        }
        if (searchparams.best !== undefined) {
            query.append("best", searchparams.best);
        }
        if (searchparams.top !== undefined) {
            query.append("top", searchparams.top);
        }
        if (searchparams.featured !== undefined) {
            query.append("featured", searchparams.featured);
        }
        if (searchparams.product_slug !== undefined) {
            query.append("product_slug", searchparams.product_slug);
        }
        if (searchparams.limit !== undefined) {
            query.append("limit", searchparams.limit);
        }
        if (searchparams.category_slug !== undefined) {
            query.append("category_slug", searchparams.category_slug);
        }
        if (searchparams.color_ids !== undefined) {
            query.append("color_ids", searchparams.color_ids);
        }
        if (searchparams.brand_ids !== undefined) {
            query.append("brand_ids", searchparams.brand_ids);
        }
        if (searchparams.sortby !== undefined) {
            query.append("sortby", searchparams.sortby);
        }
        const response = await axiosApiInstance.get(`product?${query.toString()}`)
        // jo query bani hai use string mein convert krke backend server par bhej diya
        if (response.data.flag == 1) {
            return response.data
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

const getProductById = async (id) => {
    try {
        const response = await axiosApiInstance.get(`product/${id}`)
        if (response.data.flag == 1) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
}

module.exports = { getProducts, getProductById };