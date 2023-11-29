import ProductManager from "../../dao/managersFs/ProductManager.js";
import CartsManager from "../../dao/managersFs/CartsManager.js";
import PM from "../../dao/managersMongoDB/ProductsManager.js";
import CM from "../../dao/managersMongoDB/CartManager.js";
import { Router } from "express";
import cartModel from "../../dao/models/cart.js";
const productmanager=new ProductManager('Products.js');
const cartsmanager=new CartsManager('Carts.js');
const router=Router();

router.post('/carts',(req,res)=>{
    async function create(){
        const { body } = req;
     //await cartsmanager.createCart();
     //const carts=await cartsmanager.getCarts()
     await CM.createCart(body)
     const carts= await CM.getCarts();
     res.status(201).json(carts);
    }
     create();
     
 });
 router.get('/carts',(req,res)=>{
    async function get(){
      const carts=  await CM.getCarts();
        res.status(200).json(carts);
    }
    get()
 })
 
 router.get('/carts/:cid',(req,res)=>{
 const{cid}= req.params;
     async function run(){
         //const cart= await cartsmanager.getProductsFromCart(parseInt(cid));
         const cart= await cartModel.findOne({_id:cid}).populate('products.product')
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
         //const product= await productmanager.getProductById(parseInt(pid));
         //const cart= await cartsmanager.getProductsFromCart(parseInt(cid));
         const product=await PM.getProductById(pid);
         const cart= await CM.getProductsFromCart(cid);
         if(!product){
             res.status(404).json({ error: 'Product not found' });
         }else{
             if(!cart){
                 res.status(404).json({ error: 'Cart not found' });
             }else{
                 //await cartsmanager.addProductsToCart(parseInt(cid), parseInt(pid) ,body.quantity);
                 await CM.addProductsToCart(cid,pid,body.quantity);
                 res.status(201).json(cart);
             }
             
         }
     }
     buy();
 })
 router.put('/carts/:cid', async (req, res) => {
    const {cid}=req.params;
    const {body}= req;
    await CM.updatedProductsfromCartById(cid,body);
    res.status(204).end();
   });
   router.delete('/carts/:cid', async (req,res)=>{
    const {cid}=req.params;
    await CM.deleteproductsfromCartById(cid);
    res.status(204).end();
   });
   router.delete('/carts/:cid/products/:pid', async (req, res) => {
    const {cid,pid}=req.params;
    await CM.deleteProductFromCart(cid,pid);
    res.status(204).end();
   });
   router.put('/carts/:cid/products/:pid', async (req, res) => {
    const {cid}=req.params;
    const {body}= req;
    await CM.updateQuantityProductsfromCartById(cid,pid,body.quantity);
    res.status(204).end();
   });

   

 export default router;