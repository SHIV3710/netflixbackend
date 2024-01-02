const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

    original_title:{
        type:String,
    },
    poster_path:{
        type:String,
    },
    genre_ids:[{
        type:String,
    }],

});


module.exports = mongoose.model("Movie", movieSchema);