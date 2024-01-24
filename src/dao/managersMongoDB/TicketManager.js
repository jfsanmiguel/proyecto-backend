import ticketModel from "../models/ticket.js";
import userModel from "../models/user.js";

export default class TicketManager{
    static getAll(filter={},opts={}){
        const tickets= ticketModel.find(filter,opts)
        return tickets;
    }
    static getOne(criteria={}){
        return ticketModel.findOne(criteria)
    }
    static createticket(data){
        return ticketModel.create(data);
    }
    static updateticketById(tid,data){
        return ticketModel.updateOne({_id:tid}, {$set:data});
    }
    static deleteById(uid){
        return ticketModel.deleteOne({_id:uid});
    }
    
}