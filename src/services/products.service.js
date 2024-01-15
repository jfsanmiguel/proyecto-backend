import ProductsManager from "../dao/managersMongoDB/ProductsManager.js";

export default class ProductService{
    static getAll(filter = {}){
        return ProductsManager.getAll();
    }
    static create(data){
        return ProductsManager.createUser(data);
    }

    static async getById(id){
        const result = ProductsManager.getAll({_id:id});
        return result[0];
    }
    static async updateById(id,data){
      return ProductsManager.updateUserById(id,data);
    }
    static async deleteById(id){
        return ProductsManager.deleteById(id);
    }
}