const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const {readdirSync} = require("fs"); //getting the readdirSync from the fs module
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//middleware
app.use(express.json()); //the data will be in json-format
app.use(cors()); //cors where the server should be accessed by, leaving it empty in this case, could be a domain

//routes
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route))); //This is going to read the files we have in the routes folder. 
//Since we might have multiple files in the routes folder we are map the files and name each files as route
//Base API is /api/v1

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log("listening to port:", PORT);
    })
}

server();