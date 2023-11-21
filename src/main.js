import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { studentModel } from "./schemas/student.js"
studentModel

dotenv.config();
const app = express();
app.use(express.json());

async function connectToDb(){
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("DONE");
    } catch(error) {
        console.log(error);
    }    
}
connectToDb();

app.get('/:id',async(req,res)=>{
    try{
        const specificStudent=await studentModel.findById(req.params.id);
        res.json(specificStudent);
    } catch(error){
        console.log("Enter Correct Id");
    }
});

app.get('/',async(req,res)=>{
    try{
        const allStudent = await studentModel.find({});
        res.json(allStudent);
    } catch(error) {
        console.log("Error");
    }    
});

app.post('/', async (req, res) => {
    try{
        const newItem = await studentModel.create(req.body);
        res.json(newItem);
    } catch(error) {
        console.log("Error");
    }    
});

app.delete('/:id',async(req,res)=>{
    try{
        const deletedItem = await studentModel.findByIdAndDelete(req.params.id);
        if(deletedItem){
            res.json("Deleted Successfully");
        } else {
            res.json("Incorrect Id");
        }
    } catch(error) {
        res.json("Id not found");
    }    
});

app.listen(3000,()=>{
    console.log("http://localhost:3000");
});