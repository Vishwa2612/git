import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    }
})

export const studentModel = mongoose.model("student",studentSchema);