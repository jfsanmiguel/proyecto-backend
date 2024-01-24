import mongoose, {Schema} from "mongoose";

const userSchema= new Schema({
    first_Name: {type:String,required:true},
    last_Name:{type:String,required:false},
    email:{type:String,required:false},
    password:{type:String,required:false},
    age:{type:Number,required:false},
    cart:{type:mongoose.Schema.Types.ObjectId, ref:'carts'},
    role:{type:String, required: false, default:'user', enum:['user','operator','admin'] },
    tickets: [
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Ticket'
        }
    ]
},{timestamps:true})


export default mongoose.model('User',userSchema);