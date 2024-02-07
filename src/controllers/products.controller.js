import ProductModel from "../dao/models/product.js";
import ProductService from "../services/products.service.js";
import { BadRequestException, NotFound } from "../utils.js";
import { logger } from "../config/logger.js";
export default class productController {
    static getProducts(){
        return ProductService.getAll();
    }
    static async getProductById(pid){
        const product= await ProductModel.findById(pid);
        if(!product){
            throw new Error('Product not found');
        }
        return product;
    }
    static async addProduct(data){
        let product = await ProductModel.findById(data._id);
        if (product) {
            logger.warning(" the product with the code " + data._id + " does not exist");
            return
        } else if (!data.title || !data.description || !data.price || !data.thumbnail || !data.stock || !data.category) {
            throw new BadRequestException('Please fill all entries')
        } else {
            const product= await ProductService.create(data);
            logger.info('New product added successfully')
            return product;

        }
    }
    static async updateProductById(pid,data){
        let product = await ProductModel.findById(pid);
        if (!product) {
            logger.warning(" the product with the code " + pid + " does not exist");
            return
        } else if (!data.title || !data.description || !data.price || !data.thumbnail || !data.stock || !data.category) {
            throw new BadRequestException('Please fill all entries')
        } else {
           await ProductModel.updateOne({_id:pid},{$set: data})
           logger.info('product updated succesfully');
        }
    }
    static async deleteProductById(pid){
        let product = await ProductModel.findById(pid);
        if (!product) {
            logger.warning(" the product with the code " + pid + " does not exist");
            return
        }else{
            await ProductModel.deleteOne({_id:pid});
            logger.info('product deleted successfully');
        }
    }
    static async reduceProductStock(pid,purchase){
        let product = await ProductModel.findById(pid);
        if (!product) {
            logger.warning(" the product with the code " + pid + " does not exist");
            return
        } else {
            product.stock=product.stock-purchase;
           await ProductModel.updateOne({_id:pid},product);
           logger.info('product updated succesfully');
        }
    }
    
}