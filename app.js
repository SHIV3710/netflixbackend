const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");  
const cors = require("cors");

// require("dotenv").config({path: "Backend/config/config.env"})
require("dotenv").config({path: "./config/config.env"})

//Using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('hii this is api');
})

require("dotenv").config({path: "backend/config/config.env"})

const user = require("./routes/UserRoutes");

app.use("/api",user);

module.exports = app;