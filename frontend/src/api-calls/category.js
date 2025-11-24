import { axiosApiInstance } from "@/helper/helper";

const getCategories = async () => {
    try {
        const response = await axiosApiInstance.get('category')
        if (response.data.flag == 1) {
            return response.data.categories
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

module.exports = { getCategories };