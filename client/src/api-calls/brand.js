const { axiosApiInstance } = require("@/helper/helper");

const getBrands = async (queryParams = {}) => {
    const query = new URLSearchParams();
    if (queryParams.status) {
        query.append("status", queryParams.status);
    }
    if (queryParams.home) {
        query.append("home", queryParams.home);
    }
    if (queryParams.best) {
        query.append("best", queryParams.best);
    }
    if (queryParams.top) {
        query.append("top", queryParams.top);
    }
    if (queryParams.slug) {
        query.append("slug", queryParams.slug);
    }
    if (queryParams.limit) {
        query.append("limit", queryParams.limit);
    }

    try {
        const response = await axiosApiInstance.get(`brand?+${query.toString()}`);
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