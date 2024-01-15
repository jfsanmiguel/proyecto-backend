import userModel from "../dao/models/user.js";
import UserService from "../services/user.service.js";
export default class userController {
    static getAll(filter={}) {
        return UserService.getAll(filter);
    }
    static getOne(filter={}) {
        return UserService.getOne(filter);
    }
    
    static create(data){
        return UserService.create(data)
    }
    static async getById(id){
        const user= await UserService.getById(id);
        if(!user){
            throw new Error(`User ${id} not found`)
        }
        return user
    }
    static updatebyId(id,data){
        return UserService.updateById(id,data);
    }
    static deleteById(id){
        return UserService.deleteById(id);
    }
}