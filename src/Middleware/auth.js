const jwt=require("jsonwebtoken")
const auth= async function(req,res,next){
    try{
        let token= req.headers["movie-key"]
        if(!token) token =req.headers["movie-Key"]
        if(!token) return res.status(400).send({status:false,message:"token must be present"})
    
        jwt.verify(token, "moviekey", {ignoreExpiration:true},function(err,dcodedtken){
            if(err)  return res.status(400).send({status:false,message:"token is invalid"})
            req.userId=dcodedtken.userId

            next()
        })

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports={auth}