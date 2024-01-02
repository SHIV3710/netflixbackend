const { MongoDriverError } = require("mongodb");
const User = require("../models/UserModel");
const Movie = require("../models/movie");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Login First",
      });
    }
    const likedMovies = user.likedMovies || [];
    let movies = [];
    await Promise.all(likedMovies.map(async (movie,index)=>{
      const mov = await Movie.findOne({_id:movie});
      if(mov){
        movies.push(mov);
      }
    }))
    movies = [...new Set(movies)];
    return res.status(200).send({
      success: true,
      movies: movies,
    });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return res.status(500).json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const {email,data} = req.body;
    const mail = email;
    const user = await User.findOne({email:mail});   
    const original_title = data.original_title;
    const poster_path = data.poster_path;
    const genre_ids = data.genre_ids;

    if(!user){
      return res.status(404).json({
        success:false,
        message:"Login First",
      })
    } 
   
    const newmovie = {
      original_title:original_title,
      poster_path:poster_path,
      genre_ids:genre_ids,
    }
    const mov = await Movie.findOne({original_title}); 
    
    if(!mov){
      mov = await Movie.create(newmovie);
    }

    if(user.likedMovies.includes(mov._id)){
      return res.status(200).json({
        success:true,
        message:"Movie already liked",
        user,
      });
    }
    else{
      user.likedMovies.push(mov);
      user.save();
      return res.status(201).json({
        success:true,
        message:"Movie liked successfully",
        user,
      });
    }
   
  } catch (error) {
    return res.status(500).json({
      
      success: false,
      message: error,
    })
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const {email,original_title} = req.body;

    const user = await User.findOne({email}); 
    if(!user){
      return res.status(404).json({
        success:false,
        message:"Login First",
      })
    } 
    const movi = await Movie.findOne({original_title});

    if(!user.likedMovies.includes(movi._id)){
      return res.status(404).json({
        success:false,
        message:"Movie not found",
      })

    }

    const mov = await user.likedMovies.indexOf(movi._id); 
      user.likedMovies.splice(mov,1);
      user.save();
      return res.status(201).json({
        success:true,
        message:"Movie disked successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error removing movie from List",
    })
  }
};

module.exports.adduser = async(req,res) => {
  try {
    
    const {email,password} = req.body;  
    let user = await User.findOne({email,password});
    if(user){
      return res.status(400).json({success: false, message: "User already exists"});
    }
    user = await User.create({
      email,
      password,
    });

    return res.status(201).json({
      success: false,
      message: "User registered succesfully",
      user,
    });
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message,
    })
  }
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email, password }).exec();

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Sign up Please",
      });
    }

    res.status(201).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.logout = async (req,res) => {
  try {
    return res.status(200).json({
      success: true,
      message:"Logout successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
