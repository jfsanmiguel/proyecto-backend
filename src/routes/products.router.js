import ProductManager from "../ProductManager.js";
import { Router } from "express";
const productmanager= new ProductManager('Products.js');
const router= Router();

router.get('/products', (req, res) => {
    const { query } = req;
    const { limit } = query;
    async function get() {
        const products = await productmanager.getProducts();
        if (!limit) {
            res.status(200).json(products);
        } else {
            const response = products.slice(0, parseInt(limit));
            res.status(200).json(response);
        }
    }
    get();

});

router.post('/products', (req, res) => {
    const { body } = req;
    async function add() {
        await productmanager.addProduct(body.title, body.description, body.price, body.thumbnail, body.code, body.stock, body.category);
        const products = await productmanager.getProducts();
        res.status(201).json(products);
    }
    add();
})

router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        const product = await productmanager.getProductById(parseInt(productId));
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
        const product = await productmanager.getProductById(parseInt(productId));
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            if(body.title){
                await productmanager.updateProduct(parseInt(productId), 'title', body.title);
            }else{
                console.log("title will not be changed")
            }
            if(body.description){
                await productmanager.updateProduct(parseInt(productId), 'description', body.description);
            }else{
                console.log("description will not be changed")
            }
            if(body.price){
                await productmanager.updateProduct(parseInt(productId), 'price', body.price);
            }else{
                console.log("price will not be changed")
            }
            if(body.thumbnail){
                await productmanager.updateProduct(parseInt(productId), 'thumbnails', body.thumbnail);
            }else{
                console.log("thumbnails will not be changed")
            }
            if(body.code){
                await productmanager.updateProduct(parseInt(productId), 'code', body.code);
            }else{
                console.log("code will not be changed")
            }
            if(body.stock){
                await productmanager.updateProduct(parseInt(productId), 'stock', body.stock);
            }else{
                console.log("stock will not be changed")
            }
            if(body.status){
                await productmanager.updateProduct(parseInt(productId), 'status', body.status);
            }else{
                console.log("status will not be changed")
            }
            if(body.category){
                await productmanager.updateProduct(parseInt(productId), 'category', body.category);
            }else{
                console.log("category will not be changed")
            }
            res.status(200).json(product);     
        }
    }
    update();
});
router.delete('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        const product = await productmanager.getProductById(parseInt(productId));
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            await productmanager.deleteProduct(parseInt(productId));
            res.status(200).json({message:'the following product was deleted',productId});
        }
    }
    run();
});

export default router;