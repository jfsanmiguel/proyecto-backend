import config from "../config/config.js";
import mongoose from "mongoose";
import { logger } from "../config/logger.js";

const URI= config.mongodbURI;
export const init= async ()=>{
    try{
        await mongoose.connect(URI)
        logger.info('Database connected succesfully')
    }catch(error){
        logger.error('An unexpected error ocurred')
        logger.info(URI)
    }
}