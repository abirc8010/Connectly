import httpStatus from 'http-status';
import {User} from '../models/usermodel.js';
import bcrypt,{hash} from 'bcrypt';
import crypto from 'crypto';
const login=async(req,res)=>{
     const {username,password}=req.body;
     if(!username || !password){
          return res.status(400).json({message:"Please enter all fields"});
     }
    try{
          const user=await User.findOne({username});
          if(!user){
            return res.httpStatus.NOT_FOUND.json({message:"User does not exist"});
          }
          if(bcrypt.compare(password,user.password)){
            let token=crypto.randomBytes(20).toString('hex');
            user.token=token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token});
          }
    }
    catch(e){
         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:`Opps! Something went wrong ${e}`});    
      }
}
const register = async (req,res) => {
    const {name,username,password}=req.body;
    try{
       const existingUser=await User.findOne({username});
       if(existingUser)
          return res.status(httpStatus.FOUND).json({message:"User already exists"});
   
       const hashedPassword=await bcrypt.hash(password,10);
       const newUser= new User({
          name:name,
          username:username,
          password:hashedPassword
       })
       await newUser.save();
       res.status(httpStatus.CREATED).json({message:"User registered successfully"});
    }
    catch(e){
         res.json({message:`Opps! Something went wrong ${e}`});
    }
}
export {login,register};