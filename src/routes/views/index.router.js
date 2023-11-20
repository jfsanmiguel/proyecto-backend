import { Router } from "express";
import PM from "../../dao/managersMongoDB/ProductsManager.js";

const router = Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Welcome to Fungstore'});
});

router.get('/products', async (req, res) => {
    const products= await PM.getProducts();
    res.render('products', { products: products.map(pro=>pro.toJSON()), title: 'Products list' })
});
router.get('/chat',(req,res)=>{
    res.render('chat', {title: 'customer chat'});
})


export default router