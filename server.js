const app = require("./app");   
const { connectDatabase } = require("./database");

require("dotenv").config({path: "./config"})

connectDatabase();

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is runnning`);
});

