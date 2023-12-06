import mongoose, {Schema} from "mongoose";

const userSchema= new Schema({
    first_Name: {type:String,required:true},
    last_Name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:false},
},{timestamps:true})

export default mongoose.model('User',userSchema);