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
    statusOC:String,//pending, in progress, resolved
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
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("complaint",complaint);