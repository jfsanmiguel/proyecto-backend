import { Router } from "express";
import PM from "../../dao/managersMongoDB/ProductsManager.js";
import cartModel from "../../dao/models/cart.js";


const router = Router();

router.get('/',(req,res)=>{
    if(!req.session.counter){
        req.session.counter=1;
    }else{
        req.session.counter++;
    }
    
    res.render('index',{title:'Welcome to Fungstore', counter: req.session.counter});
});

router.get('/products', async (req, res) => {
    const products= await PM.getProducts();
    res.render('products', { products: products.map(pro=>pro.toJSON()), title: 'Products list' })
});
router.get('/chat',(req,res)=>{
    res.render('chat', {title: 'customer chat'});
})

router.get('/profile', async (req, res) => {
    if(!req.user){
        return res.redirect('/login')
    }else{
        const products= await PM.getProducts();
        res.render('profile', { products: products.map(pro=>pro.toJSON()), title: 'Welcome back',user:req.user.toJSON() })
    }

    
    
   
});
router.get('/current', async (req, res) => {
    if(!req.user){
        return res.redirect('/login')
    }else{
        const user= req.user;
        const cart= await cartModel.findOne({_id:user.cart}).populate('products.product');
        if(!cart){
        const products= await PM.getProducts(); 
        res.render('profile', { products: products.map(pro=>pro.toJSON()), title: 'Welcome back',user:req.user.toJSON() })
        }else{
        res.render('current', { products: cart.products.map(pro=>pro.toJSON()), title: 'Your Cart',user:user.toJSON(),quantity:cart.quantity})
        }
        
    }

    
    
   
});
router.get('/login', async (req, res) => {
    res.render( 'login', {title:'Log-in'})
});
router.get('/register', async (req, res) => {
    res.render('register', {  title: 'Register' })
});

router.get('/password-recover',(req,res)=>{
    res.render('recover', {title: 'Recover password'});

})


export default router