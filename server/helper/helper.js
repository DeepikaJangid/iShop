function generateUniqueImageName(imageName) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const dateTime = `${year}${month}${day}_${hour}${minute}${second}`;

    const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random number

    return `${dateTime}_${randomNum}_${imageName}`;
}

export { generateUniqueImageName };