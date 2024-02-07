import config from "../config/config.js";
import mongoose from "mongoose";
import { logger } from "../config/logger.js";


const URI= config.mongodbURI;
export default class MongoSingleton{
    static #instance;
    constructor(){
        mongoose.connect(URI,{})
        .then(()=>logger.info('Connected to Database'))
        .catch((error)=>logger.error(error.message));
    }
    static getInstance() {
        if(MongoSingleton.#instance){
            logger.warning('There is already an instance of MongoSingleton')
            
            return MongoSingleton.#instance;
        }else{
            logger.info('creating new instance')
            MongoSingleton.#instance= new MongoSingleton();
        }
    }
}