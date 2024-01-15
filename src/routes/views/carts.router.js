import { Router } from "express";
import cartModel from "../../dao/models/cart.js";
import cartController from "../../controllers/carts.controller.js";

const router = Router();

router.get('/carts/:cid',async (req,res)=>{
    const{cid}= req.params;
    const cart= await cartController.populateProducts(cid);
    res.render('cart', { cart: cart.toJSON(), title: 'Cart' })
    })

    export default router