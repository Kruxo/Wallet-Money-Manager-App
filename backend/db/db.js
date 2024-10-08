const mongoose = require("mongoose"); 

const db = async () => {
    try { 
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection error");
    }
}

//Shortcommands req, trycatch, clg and the rest of the code will be autofilled

module.exports = {db}; //Export this to another script