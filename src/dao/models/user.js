import mongoose, {Schema} from "mongoose";
const TicketCollection= new mongoose.Schema({
    ticket: {type: mongoose.Schema.Types.ObjectId, ref:'tickets'}
},{_id:false});
const DocumentsCollection= new mongoose.Schema({
    name: {type:String,required:false},
    reference: {type:String,required:false}
},{_id:false});

const userSchema= new Schema({
    first_Name: {type:String,required:true},
    last_Name:{type:String,required:false},
    email:{type:String,required:false},
    password:{type:String,required:false},
    age:{type:Number,required:false},
    cart:{type:mongoose.Schema.Types.ObjectId, ref:'carts'},
    role:{type:String, required: false, default:'user', enum:['user','operator','admin','premium'] },
    tickets:{type: [TicketCollection],default:[]},
    documents:{type: [DocumentsCollection],default:[]},
    last_Connection:{type:String,required:false},
},{timestamps:true})


export default mongoose.model('User',userSchema);