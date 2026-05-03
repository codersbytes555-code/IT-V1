import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }


})

const demo = mongoose.model('demo',demoSchema);

export default demo;