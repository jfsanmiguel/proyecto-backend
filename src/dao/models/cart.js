import mongoose from "mongoose";

const ProductCollection= new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref:'products'},
    quantity: {type: Number}
},{_id:false});

const CartSchema= new mongoose.Schema({
    customer:String,
    products:{type: [ProductCollection],default:[]}
    
    
},{timestamps:true})

const cartModel= mongoose.model('carts',CartSchema);

export default cartModel;