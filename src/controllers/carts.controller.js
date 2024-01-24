import CartModel from "../dao/models/cart.js";
import ProductModel from "../dao/models/product.js";
export default class cartController {
    static getCarts(){
        return CartModel.find({});
    }
    static async createCart(data){
        const cart= await CartModel.create(data);
        console.log('New cart created successfully');
        return cart;
    }
    static async updateCartById(cid,data){
        const cart= await CartModel.findById(cid);
        if(!cart){
            throw new NotFound(" The cart was not found")
        }else{
            await CartModel.updateOne({_id:cid},{$set:data});
            console.log('cart updated succesfully')
        }
        
    }
    static async deleteproductsfromCartById(cid){
        const cart= await CartModel.findById(cid);
        if(!cart){
            throw new NotFound(" The cart was not found")
        }else{
            deletedProducts=[];
            await CartModel.updateOne({_id:cid},{products:deletedProducts});
            console.log("products deleted");
        }
    }
    static async updatedProductsfromCartById(cid,data){
        const cart= await CartModel.findById(cid);
        if(!cart){
            throw new NotFound(" The cart was not found")
        }else{
            cart.products=data;
            const updatedProducts=cart.products;
            await CartModel.updateOne({_id:cid},{products:updatedProducts});
            console.log("products updated");
        }
    }
    static async updateQuantityProductsfromCartById(cid, pid,quantity){
        const cart= await CartModel.findById(cid);
        if(!cart){
            throw new NotFound(" The cart was not found")
        }else{
            const productIndex= cart.products.findIndex(prod => prod.product.toString() === pid);
            cart.products[productIndex].quantity=quantity;
            
                await CartModel.updateOne({_id:cid},product);
            
        }
    }
    static async getProductsFromCart(cid){
        const cartId= await CartModel.findById(cid)
        if(!cartId){
            throw new NotFound(" The cart was not found")
        }else{
            return cartId.products;
        }
    }
    static async compareQuantityandStock(cid,pid){
        const cart= await CartModel.findById(cid)
        const product= await ProductModel.findById(pid);
        if(!cart || !product){
            throw new NotFound(" The cart or product was not found")
        }else{
            const productIndex= cart.products.findIndex(prod => prod.product.toString() === pid);
            const diference= product.stock-cart.products[productIndex].quantity;
            if(diference>=0){
                return true
            }else{
                return false
            }
            
        }
    }

    static async addProductsToCart(cid,pid,quantity){
        const cart= await CartModel.findById(cid);
        if(!cart){
            throw new NotFound(" The cart was not found")
        }else{
            const productExists= cart.products.find(prod=>prod.product===pid);
            if(!productExists){
                const newProduct = {
                    product: pid,
                    quantity: quantity,
                }
                cart.products.push(newProduct);
                await CartModel.updateOne({_id:cid},cart);
                console.log('product added successfully');
            }else{
                productExists.quantity=productExists.quantity+quantity;
                
                await CartModel.updateOne({_id:cid},productExists);

            }
        }
       
    }
    static async deleteProductFromCart(cid,pid){
        const cart= await CartModel.findById(cid);
        if(!cart){
            throw new NotFound(" The cart was not found")
        }else{
            const productToDelete= cart.products.findIndex(prod=>prod.id===pid);
            if(productToDelete!==-1){
                cart.products.splice(productToDelete,1);
            }else{
                throw new NotFound(" Product not found")
            }

    }
 
}
static async populateProducts(cid){
    await CartModel.findOne({_id:cid}).populate('products.product');     
}
}