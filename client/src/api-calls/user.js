// this is for when the user changes it's address's.
// when i fetch data from localsotrage.... even after the user changed their address; localstorage still store older data

import { axiosApiInstance } from "@/helper/helper";

const getAddresses = async (userId) => {
    try {
        const response = await axiosApiInstance.get(`/user/${userId}/addresses`);
        return response.data.flag ? response.data.shipping_address : [];
    } catch (error) {
        return [];
    }
};

const addAddress = async (userId, newAddress) => {
    try {
        const response = await axiosApiInstance.post(`/user/${userId}/address/add`, newAddress);
        return response.data.flag ? response.data.shipping_address : null;
    } catch (error) {
        return null;
    }
};

const updateAddress = async (userId, index, updatedAddress) => {
    try {
        const response = await axiosApiInstance.put(`/user/${userId}/address/update`, { index, updatedAddress });
        return response.data.flag ? response.data.shipping_address : null;
    } catch (error) {
        return null;
    }
};

const deleteAddress = async (userId, index) => {
    try {
        const response = await axiosApiInstance.delete(`/user/${userId}/address/delete`, { data: { index } });
        return response.data.flag ? response.data.shipping_address : null;
    } catch (error) {
        return null;
    }
};

module.exports = { addAddress, updateAddress, deleteAddress, getAddresses };