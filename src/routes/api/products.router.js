import PM from "../../dao/managersMongoDB/ProductsManager.js";
import ProductManager from "../../dao/managersFs/ProductManager.js";
import { Router } from "express";
const productmanager= new ProductManager('Products.js');
import product from "../../dao/models/product.js";
const router= Router();
import { buildResponsePaginated } from "../../utils.js";
import { URL_BASE } from "../../utils.js";

router.get('/products', (req, res) => {
    
    // sort linked with price
    // search linked with category
    async function get() {
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

        
        
            
    }
    get();

});

router.post('/products', (req, res) => {
    const { body } = req;
    async function add() {
        //await productmanager.addProduct(body.title, body.description, body.price, body.thumbnail, body.code, body.stock, body.category);
        //const products = await productmanager.getProducts();
        const products= await PM.addProduct(body);
        res.status(201).json(products);
    }
    add();
})

router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        //const product = await productmanager.getProductById(parseInt(productId));
        const product= await PM.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            res.status(200).json(product);
        }
    }
    run();
});
router.put('/products/:productId', (req, res) => {
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
        const product= await PM.getProductById(productId)
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            await PM.updateProductById(productId,body);
            res.status(204).end();
        }
        
    }
    update();
});
router.delete('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        //const product = await productmanager.getProductById(parseInt(productId));
        const product= await PM.getProductById(productId)
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            //await productmanager.deleteProduct(parseInt(productId));
            //res.status(200).json({message:'the following product was deleted',productId});
            await PM.deleteProductById(productId);
            res.status(204).end();
        }
    }
    run();
});





export default router;