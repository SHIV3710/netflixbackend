const mongoose = require("mongoose");
exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connection Successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
