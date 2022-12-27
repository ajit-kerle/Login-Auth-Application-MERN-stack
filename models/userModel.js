import mongoose from 'mongoose';
import  Validator  from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// secret key for jwt signing and verification
const secretkey="kimshukatechnologyassignment"


// user schema for logging functionality
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!Validator.isEmail(value)){
              throw new Error("Not valid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
    }, 
    tokens:[
        {
            token:{
            type:String,
            required:true,
            }
        }
    ]
})


// hasing password function
userSchema.pre("save",async function (next) {  

     if (this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12); 
    }
    next()
})

// token generate function using jwt 
userSchema.methods.generateAuthtoken=async function(){
   try{
      let newtoken=jwt.sign({_id:this._id},secretkey,{
        expiresIn:"1d"
      })
      this.tokens=this.tokens.concat({token:newtoken})
      await this.save();
      return newtoken
   }catch(error){
     res.status(422).json(error)
   }
}

const userModel=new  mongoose.model("user",userSchema)

export default userModel