function slugGenerator(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, '-')      // spaces → hyphens
        .replace(/[^\w-]+/g, '')     // remove non-alphanumeric
        .replace(/-+/g, '-');        // collapse multiple hyphens
}

export { slugGenerator }