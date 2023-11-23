const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  adduser,
  logout,
  login,
} = require("../controllers/UserController");

const router = require("express").Router();

router.get("/liked", getLikedMovies);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.post("/register",adduser);
router.put("/login",login);
router.get("/logout", logout);

module.exports = router;
