import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const user= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    } ,
    isAdmin:{
        type: Boolean,
        default: false,
        required: false
    }
},
{timestamps:true}
);

user.methods.matchPassword =async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password);
}

user.pre('save', async function(next) {
    if(!this.isModified("password")){
        next();
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
} )

const User = mongoose.model("User", user);
export default  User ;