import axios from "axios";

function slugGenerator(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, '-')      // spaces → hyphens
        .replace(/[^\w-]+/g, '')     // remove non-alphanumeric
        .replace(/-+/g, '-');        // collapse multiple hyphens
}

const axiosApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export { slugGenerator, axiosApiInstance, isValidPassword }