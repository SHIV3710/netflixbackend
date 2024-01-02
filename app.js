const express = require("express");
const app = express();  

require("dotenv").config({path: "./config.env"})
const cors = require("cors");


//Using middleware
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('the api is running omg');
})
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

require("dotenv").config({path: "backend/config/config.env"})

const user = require("./routes/UserRoutes");

app.use("/api",user);

module.exports = app;