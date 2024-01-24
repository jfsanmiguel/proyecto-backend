import userModel from "../dao/models/user.js";
import cartModel from "../dao/models/cart.js";
import UserService from "../services/user.service.js";
import TicketService from "../services/tickets.service.js";
import cartController from "./carts.controller.js";
import userController from "./users.controller.js";
export default class TicketController {
    static async getAll(filters={}, opts={}) {
        const Tickets= TicketService.get(filters,opts);
        return Tickets;
    }
    static getOne(tid) {
        return TicketService.getById(tid);
    }
    
    static async createTicket(cid,data){
        const{
            products,
            purchaser,
            }=data;
        const user= await userModel.findOne({email:purchaser});
        const userCart= await cartController.populateProducts(cid);
        const{products: productsIntoCart}=userCart;
        const productsResult= productsIntoCart.filter(product=>products.includes(product.id))
        const amount= productsResult.reduce((accumulator,product)=>{
            accumulator+=product.price;
            return accumulator;
        },0);
        const code=Date.now()+139;
        const ticket= TicketService.create({
        code:code,
        products:productsResult.map(p=>p.id),
        amount:amount,
        purchaser:purchaser,
        })
        console.log('Ticket created successfully')
        const {tickets}=user;
        tickets.push(ticket);
        userController.updatebyId(cid,tickets)
        return ticket;
    }
    static async getById(id){
        const Ticket= await TicketService.getById(id);
        if(!Ticket){
            throw new Error(`Ticket ${id} not found`)
        }
        return Ticket
    }
    static updatebyId(tid,data){
        return TicketService.update(tid,data);
    }
    static deleteById(id){
        return TicketService.delete(id);
    }
}