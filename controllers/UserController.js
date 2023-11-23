const { MongoDriverError } = require("mongodb");
const User = require("../models/UserModel");
const Movie = require("../models/movie");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.body;
    const movies = [];

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Login First",
      });
    }

    const findmovie = async (id) => { 
      return await Movie.findById(id); 
    };

    const likedMovies = user.likedMovies || [];

    for (const id of likedMovies) {
      try {
        const movie = await findmovie(id);
        if (movie) {
          movies.push(movie);
        } else {
          console.error(`Movie with ID ${id} not found`);
        }
      } catch (error) {
        console.error(`Error fetching movie with ID ${id}: ${error.message}`);
      }
    }

    console.log(movies);
    
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

    const user = await User.findOne({email}); 
    
    const name = data.name;
    const image = data.image;
    const genres = data.genres;

    if(!user){
      return res.status(404).json({
        success:false,
        message:"Login First",
      })
    } 
   
    const newmovie = {
      name:name,
      image:{
        url:image,
      },
      genres:genres,
    }

    const mov = await Movie.findOne({name}); 
    console.log(mov);
    
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
      message: "Error adding movie to the liked list",
    })
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const {email,name} = req.body;

    const user = await User.findOne({email}); 
    console.log(email);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"Login First",
      })
    } 
    const movi = await Movie.findOne({name});
    if(!movi){
      console.log("HELLO");
    }
    console.log(movi);


    if(!user.likedMovies.includes(movi._id)){
      return res.status(404).json({
        success:false,
        message:"Movie not found",
      })

    }

    const mov = await user.likedMovies.indexOf(movi._id); 
    console.log(mov);
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
    console.log(user);

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

module.exports.login = async (req,res) => {
  try {

    const {email,password} = req.body;

    const user = await User.findOne({email,password});

    if(!user){
      return res.status(200).json({
        success:false,
        message:"Sign up Please",
      })
    }

    res.status(201).json({
      success: true,
      message: "Logged in successfully",
      user,
    })
    
  } catch (error) {
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
