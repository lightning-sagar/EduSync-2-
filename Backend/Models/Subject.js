import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    sname:{
        type:String,
        required:true,
    },
    teacher:{
        type:String,
        required:true
    },
    notice:[{
        type:String,
        
    }],
    coverImg:String,
    desc:String,
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
},{timestamps:true});

export default mongoose.model('Subject', SubjectSchema)