import userModel from "../models/user.js";
import UserDTO from "../../dto/user.dto.js";

export default class UserManager {
    static getAll(criteria={}){
        const users= userModel.find(criteria)
        return users.map(user=> new UserDTO(user));
    }
    static getOne(criteria={}){
        return userModel.findOne(criteria)
    }
    static createUser(data){
        return userModel.create(data);
    }
    static updateUserById(uid,data){
        return userModel.updateOne({_id:uid}, {$set:data});
    }
    static deleteById(uid){
        return userModel.deleteOne({_id:uid});
    }
}