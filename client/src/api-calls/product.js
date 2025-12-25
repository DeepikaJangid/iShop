import { axiosApiInstance } from "@/helper/helper";

const getProducts = async () => {
    try {
        const response = await axiosApiInstance.get('product')
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