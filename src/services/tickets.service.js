import TicketManager from "../dao/managersMongoDB/TicketManager.js";
import { logger } from "../config/logger.js";

export default class TicketService{
    static async get(filter={},opts={}){
        const tickets= await TicketManager.getAll(filter,opts);
        logger.info('Tickets found')
        return tickets;
    }
    static async getById(tid){
        const ticket= await TicketManager.getOne(tid);
        logger.info('Ticket found')
        return ticket;

    }
    static async create(data){
        const newTicket= await TicketManager.createticket(data);
        logger.info('Ticket created successfully')
        return newTicket;
    }
    static async update(tid,data){
       const ticket= await TicketManager.updateticketById(tid,data);
       logger.info('Ticket updated')
        return ticket;
    }
    static async delete(tid){
        const ticket= await TicketManager.deleteById(tid);
        return ticket;
    }
}