import { Router } from "express";
import ProductManager from "../../dao/managersFs/ProductManager.js";
const productManager= new ProductManager("Products.js")
const router= Router();

router.get('/realtimeproducts',async (req,res)=>{
    const products =await productManager.getProducts();
    res.render('Index',{
        payload: products,
        title:'Fungustore',
        isAdmin:true,

    });
});

export default router;