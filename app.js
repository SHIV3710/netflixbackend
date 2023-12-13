const express = require("express");
const app = express();  
require("dotenv").config({path: "./config.env"})

//Using middleware
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('hii this is api');
})

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

require("dotenv").config({path: "backend/config/config.env"})

const user = require("./routes/UserRoutes");

app.use("/api",user);

module.exports = allowCors(app);