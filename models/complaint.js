const mongoose=require('mongoose');

const complaint=mongoose.Schema({
    title:String,
    description:String,
    category:String,
    image:{
        type:String,
    },
    location:String,
    userId:String,
    resolverId:String,
    status:String,
    resolverETA:{
        type:Number,
        default:24
    },
    resolvedImage:{
        type:String
    }
})

module.exports=mongoose.model("conplaint",complaint);