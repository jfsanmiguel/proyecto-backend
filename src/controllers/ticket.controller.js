import userModel from "../dao/models/user.js";
import cartModel from "../dao/models/cart.js";
import UserService from "../services/user.service.js";
import TicketService from "../services/tickets.service.js";
import cartController from "./carts.controller.js";
import userController from "./users.controller.js";
import productController from "./products.controller.js";
import ticketModel from "../dao/models/ticket.js";
export default class TicketController {
    static async getAll(filters={}, opts={}) {
        const Tickets= TicketService.get(filters,opts);
        return Tickets;
    }
    static getOne(tid) {
        return TicketService.getById(tid);
    }
    
    static async createTicket(cid){
    const cartProducts= await cartController.getProductsFromCart(cid);
    
    const customer= await cartController.getCustomerFromCart(cid);
    const purchasedProducts=[];
    let total=0;
    for(let i=0; i<cartProducts.length;i++){
        let producti= await productController.getProductById(cartProducts[i].product.toString());
        if(cartProducts[i].quantity<=producti.stock){
            await productController.reduceProductStock(cartProducts[i].product.toString(),cartProducts[i].quantity);
            purchasedProducts.push(producti);
            total+=producti.price*cartProducts[i].quantity;
            await cartController.deleteProductFromCart(cid,cartProducts[i].product.toString());
            
        }
    }
    const newTicket={
        code:Date.now()+139,
        products:purchasedProducts,
        amount:total,
        purchaser:customer
    }
    const ticket= await TicketService.create(newTicket);
    const user= await userModel.findOne({email:customer});
    await userController.addTicketToUser(user._id, ticket._id);

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