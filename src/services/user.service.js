import UserManager from "../dao/managersMongoDB/UserManager.js";

export default class UserService{
    static getAll(filter = {}){
        return UserManager.getAll();
    }
    static create(data){
        return UserManager.createUser(data);
    }
    static getOne(filter={}){
        return UserManager.getOne(filter)
    }

    static async getById(id){
        const result = UserManager.getAll({_id:id});
        return result[0];
    }
    static async updateById(id,data){
      return UserManager.updateUserById(id,data);
    }
    static async deleteById(id){
        return UserManager.deleteById(id);
    }
    
}