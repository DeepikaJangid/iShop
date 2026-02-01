import { axiosApiInstance } from "@/helper/helper";

const getCategories = async (queryParams = {}) => {
    const query = new URLSearchParams(); //JS inbuilt function to create a new query.
    if (queryParams.status) { //if queryParams mein home aaya hai to
        query.append("status", queryParams.status); //jo bhi value aayi hai usko "home" naam se categoryController par bhej deni hai.
    }
    if (queryParams.home) { //if queryParams mein home aaya hai to
        query.append("home", queryParams.home); //jo bhi value aayi hai usko "home" naam se categoryController par bhej deni hai.
    }
    if (queryParams.best) { //if queryParams mein home aaya hai to
        query.append("best", queryParams.best); //jo bhi value aayi hai usko "home" naam se categoryController par bhej deni hai.
    }
    if (queryParams.top) { //if queryParams mein home aaya hai to
        query.append("top", queryParams.top); //jo bhi value aayi hai usko "home" naam se categoryController par bhej deni hai.
    }
    if (queryParams.slug) { //if queryParams mein home aaya hai to
        query.append("slug", queryParams.slug); //jo bhi value aayi hai usko "home" naam se categoryController par bhej deni hai.
    }
    if (queryParams.limit) { //if queryParams mein home aaya hai to
        query.append("limit", queryParams.limit); //jo bhi value aayi hai usko "home" naam se categoryController par bhej deni hai.
    }
    try {
        const response = await axiosApiInstance.get(`category?${query.toString()}`)
        if (response.data.flag == 1) {
            return response.data;
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