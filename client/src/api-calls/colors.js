const { axiosApiInstance } = require("@/helper/helper");

const getColors = async () => {
    try {
        const response = await axiosApiInstance.get('colors')
        if (response.data.flag == 1) {
            return response.data;
        }
    } catch (error) {
        return [];
    }
}


const getColorById = async (id) => {
    try {
        const response = await axiosApiInstance.get(`colors/${id}`)
        if (response.data.flag == 1) {
            return response.data;
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
}

module.exports = { getColors, getColorById };