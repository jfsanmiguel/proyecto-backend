import ProductManager from "../ProductManager.js";
import CartsManager from "../CartsManager.js";
import { Router } from "express";
const productmanager=new ProductManager('Products.js');
const cartsmanager=new CartsManager('Carts.js');
const router=Router();

router.post('/carts',(req,res)=>{
    async function create(){
     await cartsmanager.createCart();
     const carts=await cartsmanager.getCarts()
     res.status(201).json(carts);
    }
     create();
     
 });
 
 router.get('/carts/:cid',(req,res)=>{
 const{cid}= req.params;
     async function run(){
         const cart= await cartsmanager.getProductsFromCart(parseInt(cid));
         if(!cart){
             res.status(404).json({ error: 'Cart not found' });
         }else{
             res.status(200).json(cart);
         }
     }
     run();
 })
 router.post('/carts/:cid/product/:pid',(req,res)=>{
     const {cid,pid}=req.params;
     const body=req.body;
     async function buy(){
         const product= await productmanager.getProductById(parseInt(pid));
         const cart= await cartsmanager.getProductsFromCart(parseInt(cid));
         if(!product){
             res.status(404).json({ error: 'Product not found' });
         }else{
             if(!cart){
                 res.status(404).json({ error: 'Cart not found' });
             }else{
                 await cartsmanager.addProductsToCart(parseInt(cid), parseInt(pid) ,body.quantity);
                 res.status(201).json(cart);
             }
             
         }
     }
     buy();
 })

 export default router;