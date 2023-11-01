import { Server } from "socket.io"; 
import ProductManager from "./ProductManager.js";
const productmanager= new ProductManager('Products.js');
let socketServer;
export const init= (httpServer)=>{
    socketServer= new Server(httpServer);
    
    socketServer.on('connection',async(socketClient)=>{
        const products= await productmanager.getProducts();
        socketClient.emit('product-list',products)
        console.log(`new socket client ${socketClient.id} connected to server`);
        socketClient.emit('init',{ status: "OK"});
        socketClient.broadcast.emit('start',{status: "broadcasting"})
        socketClient.on('notification',(ntf)=>{
            console.log(`Client sent a new message: ${ntf}`)
        })
       
        socketServer.emit('message',{status:"on air"});
        socketClient.on('new-product',async (product)=>{
            await productmanager.addProduct(product.title,product.description,product.price,product.thumbnail,product.code,product.stock,product.category)
            const products= await productmanager.getProducts();
            socketServer.emit('product-list',products);
        })
        socketClient.on("delete-product", async(productID)=>{
            await productmanager.deleteProduct(parseInt(productID));
            const products= await productmanager.getProducts();
            socketServer.emit('product-list',products);

        })
    });
    
}


