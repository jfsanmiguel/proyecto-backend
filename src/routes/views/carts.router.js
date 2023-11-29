import { Router } from "express";
import cartModel from "../../dao/models/cart.js";

const router = Router();

router.get('/carts/:cid',async (req,res)=>{
    const{cid}= req.params;
    const cart= await cartModel.findOne({_id:cid}).populate('products.product');
    res.render('cart', { cart: cart.toJSON(), title: 'Cart' })
    })

    export default router