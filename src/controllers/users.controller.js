import userModel from "../dao/models/user.js";
import UserService from "../services/user.service.js";
import { logger } from "../config/logger.js";
export default class userController {
    static async getAll(filters={}, opts={}) {
        const users= UserService.getAll(filters,opts);
        return users;
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
    static async addTicketToUser(uid,tid){
        const user= await userModel.findById(uid);
        if(!user){
            throw new NotFound(" The user was not found")
        }else{
            const ticketExists= user.tickets.find(prod=>prod.ticket===tid);
            if(!ticketExists){
                const newTicket = {
                    ticket:tid
                }
                user.tickets.push(newTicket);
                await userModel.updateOne({_id:uid},user);
                logger.info('ticket added successfully');
            }
        }
       
    }
    static async upgradePremium(uid){
        const user= await userModel.findById(uid);
        if (!user) {
            logger.error('User not found');
        } else if(user.role==="user") {
            await userModel.updateOne({_id:uid},{role:"premium"});
        }else{
            await userModel.updateOne({_id:uid},{role:"user"});
        }
    }
    static async uploadFile(uid,typeFile,file){
        const data={};
        if(typeFile==='profiles'){
        Object.assign(data,{name: file.filename, reference:`http://localhost:8080/images/profiles/${file.filename}` });
        }else if(typeFile==='products'){
        Object.assign(data,{name: file.filename, reference:`http://localhost:8080/images/products/${file.filename}`});
        }else{
            Object.assign(data,{name: file.filename, reference: `http://localhost:8080/documents/${file.filename}`});
        }
        const user= await userModel.findById(uid);
        user.documents.push(data);
        return UserService.updateById(uid,user);
    }
}