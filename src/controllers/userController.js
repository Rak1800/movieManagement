const userModel = require("../Models/userModel");
const jwt=require("jsonwebtoken")

const userRegister= async function(req,res){
    try{
    const data=req.body
    const {fullName,gender,phone,email,password}=data
    if(Object.keys(data).length==0)  return res.status(400).send({ status: false, message: "Please fill your details" });
    if(!fullName) return res.status(400).send({ status: false, message: "Enter your fullName" }); 
    if(!gender) return res.status(400).send({ status: false, message: "Enter your gender" }); 
    if(!phone) return res.status(400).send({ status: false, message: "Enter your phone" }); 
    if(!email) return res.status(400).send({ status: false, message: "Enter your email" }); 
    if(!password) return res.status(400).send({ status: false, message: "Enter your password" }); 

    const saveData= await userModel.create(data)
    return res.status(201).send({status:true,message:"register successful", saveData})
    
    }catch(err){
         return res.status(500).send({status:false,message:err.message})
    }
}

const userLogin= async function(req,res){
    try{
        const data=req.body
        const {email,password}=data
        if(!email) return res.status(400).send({ status: false, message: "Enter your email" }); 
        if(!password) return res.status(400).send({ status: false, message: "Enter your password" }); 
        const checkuser= await userModel.findOne({email:email,password:password})
        if(!checkuser) return res.status(404).send({ status: false, message: "user not found! register now" }); 

        const token=jwt.sign({
            userId:checkuser._id.toString()
        },"moviekey");

        res.setHeader("movie-key",token)

    return res.status(200).send({status:true,message:"login successful ",token:token})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports={userRegister,userLogin}