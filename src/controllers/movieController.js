const movieModel = require("../Models/movieModel");

const addMovie= async function(req,res){
    try{
        const data=req.body
        const {movieName,category,releaseDate,userId,director,Distributed_by}=data
        if(Object.keys(data).length==0)  return res.status(400).send({ status: false, message: "Please fill your details" });
        if(!movieName) return res.status(400).send({ status: false, message: "Enter your fullName" }); 
        if(!category) return res.status(400).send({ status: false, message: "Enter your fullName" });
        if(!releaseDate) return res.status(400).send({ status: false, message: "Enter your fullName" });
        if(!userId) return res.status(400).send({ status: false, message: "Enter your userId" });
        if(!director) return res.status(400).send({ status: false, message: "Enter your fullName" });
        if(!Distributed_by) return res.status(400).send({ status: false, message: "Enter your fullName" });

        const saveMovie=await movieModel.create(data)
        return res.status(201).send({status:true,message:"add movie successful",saveMovie})

    }catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}

const movieList=async function(req,res){
    try{
        const movies=await movieModel.find()
        if(movies.length==0) return res.status(404).send({status:false,message:"movies not found"})
        return res.status(200).send({status:true,message:"movies",movies})

    }catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}

const updateMovie= async function(req,res){
    try{
        let movieId = req.params.movieId
        if (!movieId) return res.status(400).send({ status: false, message: "movieId is require" })
       

        let findMovie = await movieModel.findOne({ _id: movieId })
        if (!findMovie) return res.status(400).send({ status: false, message: "movie is not present " })

        if (findMovie.userId != req.userId) return res.status(403).send({ status: false, message: "you are unAutherized" })

        let data = req.body
        const {movieName,category,releaseDate,director,Distributed_by}=data

    
        let updatemovie = await movieModel.findOneAndUpdate({ _id: movieId, isDeleted: false }, {
            $set: {
                movieName:movieName,
                category:category,
                releaseDate:releaseDate,
                director:director,
                Distributed_by:Distributed_by
            }
        }, { new: true })

        return res.status(200).send({ status: true, message: "data is successfull update", data: updatemovie })
    }catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}

const deletemovie = async function (req, res) {
    try {
        let movieId = req.params.movieId;

        if (!movieId) { return res.status(400).send({ status: false, msg: "movieId is Required" }); }
       

        let findMovie = await movieModel.findOne({ _id: movieId, isDeleted:false});
        if (!findMovie) return res.status(404).send({ status: false, message: "Movie not Found" });

        if (findMovie.userId != req.userId) { return res.status(403).send({ status: false, msg: "You are not Authorized" }); 
    }else {
        await movieModel.findOneAndUpdate(  { _id: movieId },  { $set: { isDeleted: true, deletedAt: new Date() } },  { new: true } );
    }
        return res.status(200).send({ status: true, msg: "Movie Deleted Successfully" });
  
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });
    }
};

module.exports={addMovie,movieList,updateMovie,deletemovie}