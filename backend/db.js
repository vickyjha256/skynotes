// This is the way of connecting to database.
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({ path: ".env" });

// --------------------------------------------- This is for notes and understanding only. --------------------------------------------------
// const mongoURI = "mongodb://127.0.0.1:27017/skynotes"; // We add (/skynotes) after port because then it creates database of this name.
// const mongoURI = "mongodb://localhost:27017/skynotes"; // We didn't use this because it creates error.
// ------------------------------------------------------------------------------------------------------------------------------------------

const mongoURI = "mongodb+srv://vickyjha:vickycloud@cluster0.smbwgdu.mongodb.net/skynotes?retryWrites=true&w=majority"; // It's my cloud database connection string.
// const mongoURI = process.env.CLOUD_DB; // It's my cloud database connection string.

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => { // This connect function is used to connect to database
        console.log("Connected to MongoDB successfully.");
    })
}

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, {
//         userNewUrlPaser: true,
//         useUnifiedTopology: true,
//         // useCreateIndex: true
//     }, () => { // This connect function is used to connect to database
//         console.log("Connected to MongoDB successfully.");
//     })
// }

// console.log(mongoURI); // This is for testing only.

module.exports = connectToMongo; // It exports it to (index.js).