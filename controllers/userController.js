import userdb from '../models/userModel.js';
import bcrypt from 'bcryptjs';



// register api route handler
const registerUser=async(req,res)=>{
  const { uname, email, password, cpassword } = req.body;

  if (!uname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
  }

   try {
        
        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const obj={
                username:uname,
                email:email,
                password:password, 
                cpassword:cpassword
            }
            const finalUser = new userdb(obj);

            // here password hasing
            const storeData = await finalUser.save();           
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log(error.message);
    }
}


// loginuser api route handler
const loginUser=async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try{
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();


                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
}


// getUser routehandler for logged in user
const getUser=async(req,res)=>{
    try{
        const userData=await userdb.findOne({_id:req.userId})

        res.status(201).json({status:201,userData});

    }catch(error){
        res.status(401).json({status:401,error});
    }
}



export {registerUser,loginUser,getUser}