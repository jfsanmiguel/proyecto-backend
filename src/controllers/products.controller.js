import ProductModel from "../dao/models/product.js";
import ProductService from "../services/products.service.js";
import { BadRequestException, NotFound } from "../utils.js";
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
            console.log(" the product with the code " + data.code + " already exists")
            return
        } else if (!data.title || !data.description || !data.price || !data.thumbnail || !data.stock || !data.category) {
            throw new BadRequestException('Please fill all entries')
        } else {
            const product= await ProductService.create(data);
            console.log('New product added successfully');
            return product;

        }
    }
    static async updateProductById(pid,data){
        let product = await ProductModel.findById(pid);
        if (!product) {
            throw new NotFound(" the product with the code " + data.code + " does not exist")
            return
        } else if (!data.title || !data.description || !data.price || !data.thumbnail || !data.stock || !data.category) {
            throw new BadRequestException('Please fill all entries')
        } else {
           await ProductModel.updateOne({_id:pid},{$set: data})
           console.log('product updated succesfully');
        }
    }
    static async deleteProductById(pid){
        let product = await ProductModel.findById(pid);
        if (!product) {
            throw new NotFound(" the product with the code " + data.code + " does not exist")
            return
        }else{
            await ProductModel.deleteOne({_id:pid});
            console.log('product deleted successfully');
        }
    }
    static async reduceProductStock(pid,purchase){
        let product = await ProductModel.findById(pid);
        if (!product) {
            console.log(" the product with the code " + pid + " does not exist")
            return
        } else {
            product.stock=product.stock-purchase;
           await ProductModel.updateOne({_id:pid},product);
           console.log('product updated succesfully');
        }
    }
    
}