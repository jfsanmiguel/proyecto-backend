import UserManager from "../dao/managersMongoDB/UserManager.js";
import { userRepository } from "../repositories/index.js";
export default class UserService{
    static getAll(filter = {}, opts={}){
        return UserManager.getAll(filter,opts);
    }
    static create(data){
        return UserManager.createUser(data);
    }
    static getOne(filter={}){
        return UserManager.getOne(filter)
    }

    static async getById(id){
        const result = UserManager.getAll({_id:id});
        return result;
    }
    static async updateById(id,data){
      return UserManager.updateUserById(id,data);
      
    }
    static async deleteById(id){
        return UserManager.deleteById(id);
    }
    
}