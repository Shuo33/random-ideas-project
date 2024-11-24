// bring in mongoose, which is a library that allows us to connect to our MongoDB database and interact with it
const mongoose = require('mongoose');

// we use async/await since mongoose.connect() return a promise, 'conn.connection.host' gives the host name
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

mongoose.set('strictQuery', true);

module.exports = connectDB;

