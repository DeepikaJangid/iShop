const { axiosApiInstance } = require("@/helper/helper");
const { default: axios } = require("axios");

const getBrands = async () => {
    try {
        const response = await axiosApiInstance.get('brand');
        // console.log("getBrands", response);
        if (response.data.flag === 1) {
            return response.data;
        } else {
            return [];
        }

    } catch (error) {
        console.log('getBrands (brand.js)', error);
        return [];
    }
}

const getBrandById = async (id) => {
    try {
        const response = await axiosApiInstance.get(`brand/${id}`);
        if (response.data.flag === 1) {
            return response.data;
        } else {
            return {};
        }

    } catch (error) {
        return {};
    }
}

module.exports = { getBrands, getBrandById }