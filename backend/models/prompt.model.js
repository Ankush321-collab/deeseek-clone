const mongoose=require('mongoose');

const promptSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

    },
    role:{
        type:String,
        enum:["user","assistant"],
        required:true
    },
    content:{
        type:String,
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

const prompt=mongoose.model("prompt",promptSchema)
module.exports =prompt;
