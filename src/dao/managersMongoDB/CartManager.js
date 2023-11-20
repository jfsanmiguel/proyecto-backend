import CartModel from '../models/cart.js'

export default class CartsManager{
    static getCarts(){
        return CartModel.find();
    }
    static async createCart(data){
        const cart= await CartModel.create(data);
        console.log('New cart created successfully');
        return cart;
    }
    static async updateCartById(cid,data){
        const cart= await CartModel.findById(cid);
        if(!cart){
        console.log('the cart was not found')
        }else{
            await CartModel.updateOne({_id:cid},{$set:data});
            console.log('cart updated succesfully')
        }
        
    }
    static async deleteCartById(cid){
        await CartModel.deleteOne({_id:cid});
        console.log('cart deleted successfully');
    }
    static async getProductsFromCart(cid){
        const cartId= await CartModel.findById(cid)
        if(!cartId){
            console.log("cart not found")
        }else{
            return cartId.products;
        }
    }

    static async addProductsToCart(cid,pid,quantity){
        const cart= await CartModel.findById(cid);
        if(!cart){
            console.log("the cart was not found")
        }else{
            const productExists= await cart.products.find(prod=>prod.id===pid);
            if(!productExists){
                const newProduct = {
                    id: pid,
                    quantity: quantity,
                }
                cart.products.push(newProduct)
                const updatedProducts=cart.products;
                await CartModel.updateOne({_id:cid},{products:updatedProducts});
                console.log('product added successfully');
            }else{
                productExists.quantity=productExists.quantity+quantity;
                const updatedProducts=cart.products;
                await CartModel.updateOne({_id:cid},{products:updatedProducts});

            }
        }
       
    }
}