import TicketManager from "../dao/managersMongoDB/TicketManager.js";;

export default class TicketService{
    static async get(filter={},opts={}){
        const tickets= await TicketManager.getAll(filter,opts);
        console.log("Tickets found")
        return tickets;
    }
    static async getById(tid){
        const ticket= await TicketManager.getOne(tid);
        console.log('Ticket found')
        return ticket;

    }
    static async create(data){
        const newTicket= await TicketManager.createticket(data);
        console.log("Ticket created successfully")
        return newTicket;
    }
    static async update(tid,data){
       const ticket= await TicketManager.updateticketById(tid,data);
        console.log('Ticket updated');
        return ticket;
    }
    static async delete(tid){
        const ticket= await TicketManager.deleteById(tid);
        return ticket;
    }
}