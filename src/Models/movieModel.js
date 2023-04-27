const mongoose= require("mongoose");
const objectId= mongoose.Schema.Types.ObjectId

const movieSchema= new mongoose.Schema({
   movieName:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    releaseDate:{
        type:String,
        require:true
    },
    userId: {
        type: objectId,
        required: true,
        ref: "Users",
    },
    
    director:{
        type:String,
        require:true
    },
    Distributed_by:{
        type:String,
        require:true
    },
    isDeleted:{
        type:String,
        default:false
    }

},{timestamps:true})

module.exports=mongoose.model("Movies",movieSchema)