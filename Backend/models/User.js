const { type } = require("@testing-library/user-event/dist/type");
const mongoose=require("mongoose");
const {Schema}=require("mongoose")
const UserSchema=new Schema({
    profileImage:{
        type:String,
        default:"/profileImage.png"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("user",UserSchema);