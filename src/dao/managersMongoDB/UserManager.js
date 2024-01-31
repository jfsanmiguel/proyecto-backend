import userModel from "../models/user.js";
import UserDTO from "../../dto/user.dto.js";

export default class UserManager {
    static getAll(criteria={}){
        const users= userModel.find(criteria)
        return users;
    }
    static getOne(criteria={}){
        return userModel.findOne(criteria)
    }
    static createUser(data){
        return userModel.create(data);
    }
    
    static updateUserById(uid,data){
        const criteria={_id:uid};
        const operation={$set:data}
        return userModel.updateOne(criteria,operation);
    }
    static deleteById(uid){
        return userModel.deleteOne({_id:uid});
    }
}