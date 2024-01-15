import userModel from "../models/user.js";

export default class UserManager {
    static getAll(criteria={}){
        return userModel.find(criteria)
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