const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    max: 50, 
  },
  password:{
    type: String,
    required: true,
    max:50,
  },
  likedMovies:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Movies",
      }
    ]
});

module.exports = mongoose.model("User", userSchema);
