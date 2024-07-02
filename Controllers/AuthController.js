import { errorHandler } from "../components/error.js";
import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken';

export  const signup= async (req, res,next)=>{
    const { username, email, password } = req.body
    const newUser = new User({ username, email,password })
    try{
      await newUser.save()
      res.status(201).json('User created successfully!')
    }
    catch(error){
       next(error);
    }
   
  };

  export const signin= async(req, res ,next)=>{
    const {email, password}=req.body
    try{
      const validUser=await User.findOne({email})
      if(!validUser) return next(errorHandler(406,'user not found!!'))
        const validpassword=(password,validUser.password)
      if(!validpassword) return next(errorHandler(406,'wrong password'))
      const token =jwt.sign( {id:validUser._id}, process.env.Secret_key)
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUser)
  
    }
  catch(error){
  next (error);
  }
  };

  export const logout = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };

