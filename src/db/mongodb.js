import config from "../config/config.js";
import mongoose from "mongoose";

const URI= config.mongodbURI;
export const init= async ()=>{
    try{
        await mongoose.connect(URI)
        console.log('Database connected succesfully')
    }catch(error){
        console.error('An unexpected error ocurred')
        console.log(URI)
    }
}