import { axiosApiInstance } from "@/helper/helper";

const getCategories = async () => {
    try {
        const response = await axiosApiInstance.get('category')
        if (response.data.flag == 1) {
            return response.data
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

const getCategoryById = async (id) => {
    try {
        const response = await axiosApiInstance.get(`category/${id}`)
        if (response.data.flag == 1) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
}

module.exports = { getCategories, getCategoryById };