const mongoose=require('mongoose');

const resolver=mongoose.Schema({
    departmentName:String,
    departmentType:String,
    contactPerson:String,
    designation:String,
    email:String,
    password:String,
    // "citizen" | "resolver" | "admin"
    Phone:Number, 
    city:String,
    area:String,
    address:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("resolver",resolver);