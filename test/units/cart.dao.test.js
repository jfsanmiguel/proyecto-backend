import mongoose from "mongoose";
import ProductsManager from "../../src/dao/managersMongoDB/ProductsManager.js";
import CartManager from "../../src/dao/managersMongoDB/CartManager.js"
import Assert from "assert";
import { URI,createHash } from "../../src/utils.js";
import CartsManager from "../../src/dao/managersFs/CartsManager.js";
const assert = Assert.strict;
describe('Cart dao test', function () {
    before( async function() {
        this.timeout(10000);
        await mongoose.connect(URI);
    });
     beforeEach(async function () {
          //await mongoose.connection.collections.users.drop();
          this.timeout(5000);
     })

    it('create a new cart', async function() {
        const result = await CartManager.createCart({
            customer: "testcartcustomer@mail.com",
            products: []
         })

         assert.ok(result);
         assert.strictEqual(Array.isArray(result.products),true);
         assert.deepEqual(result.tickets,[]);
         assert.deepEqual(result.customer,'testcartcustomer@mail.com');
    });
        it('add products to cart', async function() {
            const result = await CartManager.addProductsToCart('65d56ff556e2cbc7db345f2a','655ab5ef38b839e1b54a3839',1)
            assert.ok(result);

        });
    // it();
    // it();
    // it();
    // it();
    // it();

     after(async function () {
        await mongoose.connection.close();
     })
    // afterEach(function () {

    // })

});