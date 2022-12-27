import  jwt from "jsonwebtoken";
import userdb from "../models/userModel.js";
const secretkey="kimshukatechnologyassignment"


// authentication function
const auth=async (req,res,next)=>{
   try{
    

    // getting token from headers 
    const token=req.headers.autherization;

    // authenticate the token  using jwt verify method
    const verifyToken=jwt.verify(token,secretkey);

    const getUser=await userdb.findOne({_id:verifyToken._id});
    if(!getUser){
        throw new Error("user not found")
    }
    req.token=token
    req.getUser=getUser
    req.userId=getUser._id

    next()
   }catch(error){
    res.status(401).json({status:401,message:"Unautherize token"})
     console.log("error in middleware : ",error.message)
   }
}

export default auth