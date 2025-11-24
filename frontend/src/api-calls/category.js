const axios = require("axios");

const getCategories = async () => {
    try {
        const response = await axios.get('http://localhost:5000/category')
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