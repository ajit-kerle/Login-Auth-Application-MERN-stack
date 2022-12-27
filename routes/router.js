import express from 'express';
import {registerUser,loginUser,getUser} from '../controllers/userController.js';
import auth from "../middleware/authenticate.js"


const router=express.Router()

// user registration
router.post("/register",registerUser)
// login api
router.post("/login",loginUser)
// validuser api
router.get("/validuser",auth,getUser)


// router exported
export default router