import productController from "../../controllers/products.controller.js";
import cartController from "../../controllers/carts.controller.js";
import { Router } from "express";
import cartModel from "../../dao/models/cart.js";
const router=Router();

router.post('/carts',(req,res)=>{
    async function create(){
        const { body } = req;
     //await cartsmanager.createCart();
     //const carts=await cartsmanager.getCarts()
     await cartController.createCart();
     const carts= await cartController.getCarts();
     res.status(201).json(carts);
    }
     create();
     
 });
 router.get('/carts',(req,res)=>{
    async function get(){
      const carts=  await cartController.getCarts();
        res.status(200).json(carts);
    }
    get()
 })
 
 router.get('/carts/:cid',(req,res)=>{
 const{cid}= req.params;
     async function run(){
         //const cart= await cartsmanager.getProductsFromCart(parseInt(cid));
         const cart= cartController.populateProducts(cid);
         if(!cart){
            res.status(error.statusCode || 500).json({status:'error',message})
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
         //const product= await productmanager.getProductById(parseInt(pid));
         //const cart= await cartsmanager.getProductsFromCart(parseInt(cid));
         const product=await productController.getProductById(pid);
         const cart= await cartController.getProductsFromCart(cid);
         if(!product){
            res.status(error.statusCode || 500).json({status:'error',message})
         }else{
             if(!cart){
                res.status(error.statusCode || 500).json({status:'error',message})
             }else{
                 //await cartsmanager.addProductsToCart(parseInt(cid), parseInt(pid) ,body.quantity);
                 await cartController.addProductsToCart(cid,pid,body.quantity);
                 res.status(201).json(cart);
             }
             
         }
     }
     buy();
 })
 router.put('/carts/:cid', async (req, res) => {
    const {cid}=req.params;
    const {body}= req;
    await cartController.updatedProductsfromCartById(cid,body);
    res.status(204).end();
   });
   router.delete('/carts/:cid', async (req,res)=>{
    const {cid}=req.params;
    await cartController.deleteproductsfromCartById(cid);
    res.status(204).end();
   });
   router.delete('/carts/:cid/products/:pid', async (req, res) => {
    const {cid,pid}=req.params;
    await cartController.deleteProductFromCart(cid,pid);
    res.status(204).end();
   });
   router.put('/carts/:cid/products/:pid', async (req, res) => {
    const {cid}=req.params;
    const {body}= req;
    await cartController.updateQuantityProductsfromCartById(cid,pid,body.quantity);
    res.status(204).end();
   });

   

 export default router;