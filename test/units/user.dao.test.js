import mongoose from "mongoose";
import UserManager from "../../src/dao/managersMongoDB/UserManager.js"
import CartManager from "../../src/dao/managersMongoDB/CartManager.js"
import Assert from "assert";
import { URI,createHash } from "../../src/utils.js";
const assert = Assert.strict;
describe('User dao test', function () {
    before( async function() {
        this.timeout(10000);
        await mongoose.connect(URI);
    });
     beforeEach(async function () {
          //await mongoose.connection.collections.users.drop();
          this.timeout(5000);
     })

    it('create a new user', async function() {
        const newCart = await CartManager.createCart({
            customer: "test3customer@mail.com",
            products: []
         })
        const result = await UserManager.createUser({
            first_Name:'test3',
             last_Name:'customer',
             email:'test3customer@mail.com',
             password: createHash("testpassword3"),
             age:"88",
             cart: newCart._id,
         });

         assert.ok(result);
         assert.strictEqual(result.role,'user');
         assert.strictEqual(Array.isArray(result.tickets),true);
         assert.deepEqual(result.tickets,[]);
         assert.deepEqual(result.email,'test3customer@mail.com');
    });
        it('Get user by email', async function() {
            const result = await UserManager.getOne({email:"testcustomer@mail.com"});
            assert.ok(result);
            assert.ok(result._id);
            assert.strictEqual(typeof result, 'object');
            assert.deepEqual(result.email,'testcustomer@mail.com');

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