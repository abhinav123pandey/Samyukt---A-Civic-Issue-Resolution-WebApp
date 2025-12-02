const mongoose=require('mongoose');

const complaint=mongoose.Schema({
    title:String,
    description:String,
    category:String,
    image:{
        type:String,
    },
    city:String,
    area:String,
    location:String,
    status:String,
    priority:String,
    resolverETA:{
        type:Number,
        default:24
    },
    resolvedImage:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    resolverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports=mongoose.model("complaint",complaint);