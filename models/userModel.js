const mongoose=require('mongoose');

const user=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    // "citizen" | "resolver" | "admin"
    role:String, 
    phone:Number,
    city:String,
    area:String,
    address:String,
    department:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("user",user);