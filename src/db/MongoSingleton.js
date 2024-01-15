import config from "../config/config.js";
import mongoose from "mongoose";


const URI= config.mongodbURI;
export default class MongoSingleton{
    static #instance;
    constructor(){
        mongoose.connect(URI,{})
        .then(()=>console.log('Connected to Database'))
        .catch((error)=>console.error(error.message));
    }
    static getInstance() {
        if(MongoSingleton.#instance){
            console.log('There is already an instance of MongoSingleton')
            return MongoSingleton.#instance;
        }else{
            console.log('creating new instance')
            MongoSingleton.#instance= new MongoSingleton();
        }
    }
}