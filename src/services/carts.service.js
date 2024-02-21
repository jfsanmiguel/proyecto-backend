import CartsManager from "../dao/managersMongoDB/CartManager.js";

export default class CartsService{
    static getAll(filter = {}){
        return CartsManager.getCarts(filter);
    }
    static create(data){
        return CartsManager.createCart(data);
    }
    static async getById(id){
        const result = CartsManager.getCarts({_id:id});
        return result;
    }
    static async updateById(id,data){
      return CartsManager.updateCartById(id,data);
    }
    static async deleteById(id){
        return CartsManager.deleteproductsfromCartById(id);
    }
}