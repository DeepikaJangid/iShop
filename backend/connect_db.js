const mongoose = require("mongoose");

// env requires "process.env" to get data from the env file
const connectDB = () => {
    return mongoose.connect(
        process.env.DATABASE_URL,
        {
            dbName: process.env.DB_NAME
        }
    )
}

module.exports = connectDB;