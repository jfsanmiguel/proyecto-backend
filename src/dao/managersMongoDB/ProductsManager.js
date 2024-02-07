import ProductModel from '../models/product.js';

export default class ProductsManager{
    static getProducts(filter ={}){
        return ProductModel.find(filter);
    }
    static async getProductById(pid){
        const product= await ProductModel.findById(pid);
        if(!product){
            logger.warning('Product not found');
        }
        return product;
    }
    static async addProduct(data){
        let product = await ProductModel.findById(data._id);
        if (product) {
            logger.warning(" the product with the code " + data._id + " already exists");
            return
        } else if (!data.title || !data.description || !data.price || !data.thumbnail || !data.stock || !data.category) {
            logger.warning("Please fill all entries");
        } else {
            const product= await ProductModel.create(data);
            logger.info('New product added successfully');
            return product;

        }
    }
    static async updateProductById(pid,data){
        let product = await ProductModel.findById(pid);
        if (!product) {
            console.log()
            logger.warning(" the product with the code " + pid + " does not exist");
            return
        } else if (!data.title || !data.description || !data.price || !data.thumbnail || !data.stock || !data.category) {
            logger.warning("Please fill all entries");
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
}