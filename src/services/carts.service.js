import CartsManager from "../dao/managersMongoDB/CartManager.js";

export default class CartsService{
    static getAll(filter = {}){
        return CartsManager.getAll();
    }
    static create(data){
        return CartsManager.createUser(data);
    }

    static async getById(id){
        const result = CartsManager.getAll({_id:id});
        return result[0];
    }
    static async updateById(id,data){
      return CartsManager.updateUserById(id,data);
    }
    static async deleteById(id){
        return CartsManager.deleteById(id);
    }
}