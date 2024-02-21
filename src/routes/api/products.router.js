import PM from "../../dao/managersMongoDB/ProductsManager.js";
import productController from "../../controllers/products.controller.js";
import { Router } from "express";

import product from "../../dao/models/product.js";
const router= Router();
import { buildResponsePaginated } from "../../utils.js";
import { URL_BASE } from "../../utils.js";
import { generateProduct } from "../../utils.js";
import passport from "passport";
import { authMiddleware,StrategyMiddleware } from "../../utils.js";


router.get('/products', (req, res,next) => {
    
    // sort linked with price
    // search linked with category
    async function get() {
        try {
            const {limit=10,page=1, sort, search }=req.query;
            //const products = await productmanager.getProducts();
            //const products= await PM.getProducts();
            const criteria={};
            const options={limit,page};
            if(sort){
                options.sort= {price:sort};
            }
            if(search){
                criteria.category=search;
            }
            const result= await product.paginate(criteria,options);
            res.status(200).json(buildResponsePaginated({...result,sort,search}));
    
            
        } catch (error) {
            next(error);
        }
       
        
        
            
    }
    get();

});

router.post('/products',StrategyMiddleware('jwt'),authMiddleware(['admin','premium']),(req, res,next) => {
   
    const { body } = req;
    const {user}= req.user;
    try {
        async function add() {
            //await productmanager.addProduct(body.title, body.description, body.price, body.thumbnail, body.code, body.stock, body.category);
            //const products = await productmanager.getProducts();
            const products= await productController.addProduct(body);
            if(user.role==="premium"){
                await productController.updateOwner(products._id,user.email);
            }
            res.status(201).json(products);
        }
        add();
        
    } catch (error) {
        next(error)
    }
   
    
})

router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        //const product = await productmanager.getProductById(parseInt(productId));
        const product= await productController.getProductById(productId);
        if (!product) {
           res.status(error.statusCode || 500).json({status:'error',message})
        } else {
            res.status(200).json(product);
        }
    }
    run();
});
router.put('/products/:productId',StrategyMiddleware('jwt'),authMiddleware(['admin']), (req, res) => {
    const { productId } = req.params;
    const { body } = req;
    async function update() {
        // const product = await productmanager.getProductById(parseInt(productId));
        // if (!product) {
        //     res.status(404).json({ error: 'Product not found' })
        // } else {
        //     if(body.title){
        //         await productmanager.updateProduct(parseInt(productId), 'title', body.title);
        //     }else{
        //         console.log("title will not be changed")
        //     }
        //     if(body.description){
        //         await productmanager.updateProduct(parseInt(productId), 'description', body.description);
        //     }else{
        //         console.log("description will not be changed")
        //     }
        //     if(body.price){
        //         await productmanager.updateProduct(parseInt(productId), 'price', body.price);
        //     }else{
        //         console.log("price will not be changed")
        //     }
        //     if(body.thumbnail){
        //         await productmanager.updateProduct(parseInt(productId), 'thumbnails', body.thumbnail);
        //     }else{
        //         console.log("thumbnails will not be changed")
        //     }
        //     if(body.code){
        //         await productmanager.updateProduct(parseInt(productId), 'code', body.code);
        //     }else{
        //         console.log("code will not be changed")
        //     }
        //     if(body.stock){
        //         await productmanager.updateProduct(parseInt(productId), 'stock', body.stock);
        //     }else{
        //         console.log("stock will not be changed")
        //     }
        //     if(body.status){
        //         await productmanager.updateProduct(parseInt(productId), 'status', body.status);
        //     }else{
        //         console.log("status will not be changed")
        //     }
        //     if(body.category){
        //         await productmanager.updateProduct(parseInt(productId), 'category', body.category);
        //     }else{
        //         console.log("category will not be changed")
        //     }
        //     res.status(200).json(product);     
        // }
        const product= await productController.getProductById(productId)
        if (!product) {
            res.status(error.statusCode || 500).json({status:'error',message})
        } else {
            await productController.updateProductById(productId,body);
            res.status(204).end();
        }
        
    }
    update();
});
router.delete('/products/:productId',StrategyMiddleware('jwt'),authMiddleware(['admin','premium']), (req, res) => {
    const { productId } = req.params;
    const {user}= req.user;
    async function run() {
        //const product = await productmanager.getProductById(parseInt(productId));
        const product= await productController.getProductById(productId)
        if (!product) {
            res.status(error.statusCode || 500).json({status:'error',message})
        } else if(user.role==="premium" && product.owner===user.email){
            //await productmanager.deleteProduct(parseInt(productId));
            //res.status(200).json({message:'the following product was deleted',productId});
            await productController.deleteProductById(productId);
            res.status(204).end();
        } else if(user.role==="premium" && product.owner!==user.email){
            req.logger.error('error cannot delete product')
        }else if(user.role==="admin"){
            await productController.deleteProductById(productId);
            res.status(204).end();

        }else{
            req.logger.error('error cannot delete product')
        }
    }
    run();
});
router.post('/mockingproducts',async (req,res)=>{
    for(let i=0; i<100;i++){
        await productController.addProduct(generateProduct());
    }
    const products= await productController.getProducts();
    res.status(201).json(products);


})





export default router;