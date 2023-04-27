const { auth } = require("../Middleware/auth")
const { addMovie, movieList, updateMovie, deletemovie } = require("../controllers/movieController")
const { userRegister, userLogin } = require("../controllers/userController")
const router=require("express").Router()

//user Api

router.post("/register",userRegister)
router.post("/login",userLogin)

// movie Api

router.post("/addmovie",addMovie)
router.get("/allmovie",movieList)
router.put("/updatemovie/:movieId",auth,updateMovie)
router.delete("/deletemovie/:movieId",auth,deletemovie)

module.exports=router