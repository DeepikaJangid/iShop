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

export { slugGenerator, axiosApiInstance }