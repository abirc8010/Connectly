import { Schema } from "mongoose";
const userSchema = new Scema(
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
export default {User};