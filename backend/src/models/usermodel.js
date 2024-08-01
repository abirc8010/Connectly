import { Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        token:{type:String}

    }
)
const User= mongoose.model("User",userSchema);
export {User};