const app = require("./app");   
const { connectDatabase } = require("./database");

require("dotenv").config({path: "./config"})

connectDatabase();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

