import ProductsManager from "../dao/managersMongoDB/ProductsManager.js";

export default class ProductService{
    static getAll(filter = {}){
        return ProductsManager.getProducts(filter);
    }
    static create(data){
        return ProductsManager.addProduct(data);
    }

    static async getById(id){
        const result = ProductsManager.getAll({_id:id});
        return result[0];
    }
    static async updateById(id,data){
      return ProductsManager.updateProductById(id,data);
    }
    static async deleteById(id){
        return ProductsManager.deleteById(id);
    }
}