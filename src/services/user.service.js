import UserManager from "../dao/managersMongoDB/UserManager.js";
import { userRepository } from "../repositories/index.js";
export default class UserService{
    static getAll(filter = {}, opts={}){
        return userRepository.getAll(filter,opts);
    }
    static create(data){
        return userRepository.createUser(data);
    }
    static getOne(filter={}){
        return userRepository.getOne(filter)
    }

    static async getById(id){
        const result = userRepository.getAll({_id:id});
        return result[0];
    }
    static async updateById(id,data){
      return userRepository.updateUserById(id,data);
    }
    static async deleteById(id){
        return userRepository.deleteById(id);
    }
    
}