import * as fs from "fs";

class CartsManager {
    constructor(path){
        this.path=path
    }
    
    async createCart(customer){
        const carts= await getJsonFromFile(this.path);
        const newCart={
            customer:customer,
            id: Date.now()+13,
            products: [],
        
            };
            carts.push(newCart);
            await saveJsonInFile(this.path, carts);
        

    }
    getCarts() {
        return getJsonFromFile(this.path);
    }
    async getProductsFromCart(cid){
        const carts= await getJsonFromFile(this.path)
        const cartId=carts.find(idc=>idc.id===cid);
        if(!cartId){
            console.log("cart not found")
        }else{
            return cartId.products;
        }
    }
    async addProductsToCart(cid,pid,quantity){
        const carts= await getJsonFromFile(this.path)
        const cart=carts.find(idc=>idc.id===cid);
        if(!cart){
            console.log("the cart was not found")
        }else{
            const productExists=cart.products.find(prod=>prod.id===pid);
            if(productExists.quantity){
                productExists.quantity=productExists.quantity+quantity;
                await saveJsonInFile(this.path, carts);
            }else{
                const newProduct = {
                    id: pid,
                    quantity: quantity,
                }
                cart.products.push(newProduct);
                await saveJsonInFile(this.path, carts);
                console.log('product added successfully');

            }
        }
       
    }
    static async updateCartById(cid,change,data){
        const carts= await getJsonFromFile(this.path)
        const cart=carts.find(idc=>idc.id===cid);
        if(!cart){
        console.log('the cart was not found')
        }else{
            if (change === 'customer') {
                cart.customer = data;
                await saveJsonInFile(this.path, carts);
                console.log('cart updated succesfully')
            } else if (change === 'products') {
                cart.products = cart.products.push(data);
                await saveJsonInFile(this.path, carts);
                console.log('cart updated succesfully')
            } else {
                console.log("please enter a valid parameter to update")
            }
            
        }
        
    }
    static async updatedProductsfromCartById(cid,data){
        const carts= await getJsonFromFile(this.path)
        const cart=carts.find(idc=>idc.id===cid);
        if(!cart){
            console.log("the cart was not found")
        }else{
            cart.products=data;
            await saveJsonInFile(this.path, carts);
            console.log("products updated");
        }
    }

    static async updateQuantityProductsfromCartById(cid, pid,quantity){
        const carts= await getJsonFromFile(this.path)
        const cart=carts.find(idc=>idc.id===cid);
        if(!cart){
            console.log("the cart was not found")
        }else{
            const productIndex= cart.products.findIndex(prod => prod.product.toString() === pid);
            cart.products[productIndex].quantity=quantity;
            await saveJsonInFile(this.path, carts);
            
        }
    }
    static async deleteProductFromCart(cid,pid){
        const carts= await getJsonFromFile(this.path)
        const cart=carts.find(idc=>idc.id===cid);
        if(!cart){
            console.log("the cart was not found")
        }else{
            const productToDelete= cart.products.findIndex(prod=>prod.id===pid);
            if(productToDelete!==-1){
                cart.products.splice(productToDelete,1);
                await saveJsonInFile(this.path, carts);
            }else{
                console.log('Product not found')
            }

    }
}
static async deleteproductsfromCartById(cid){
    const carts= await getJsonFromFile(this.path)
    const cart=carts.find(idc=>idc.id===cid);
    if(!cart){
        console.log("the cart was not found")
    }else{
        cart.products=[];
        await saveJsonInFile(this.path, carts);
        console.log("products deleted");
    }
}

    

}
const getJsonFromFile = async (path) => {
    if (!fs.existsSync(path)) {
        return [];

    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
};

const saveJsonInFile = (path, data) => {
    const content = JSON.stringify(data, null, '\t');//tabulación
    return fs.promises.writeFile(path, content, 'utf-8'); // return vale como async await (devuelve promesa)
}

export default CartsManager;