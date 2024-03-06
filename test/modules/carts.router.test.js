import { expect } from "chai";
import supertest from "supertest";

const requester= supertest('http://localhost:8080');

describe('Fungstore cart testing', function() {
    beforeEach(async function () {
        //await mongoose.connection.collections.products.drop();
        this.timeout(10000);
     })
 
    it('Expect to create a cart', async function(){
    const mockCart={
        customer: "exampletest@mail.com",
        products: []
    }
    const {statusCode,ok,_body} = await requester.post('/api/carts').send(mockCart);
     expect(statusCode).to.be.equal(201);
     expect(ok).to.be.ok;
     expect(Array.isArray(_body)).to.be.ok;
 })
 it('Expect to get carts list', async function() {
    const {statusCode,ok,_body}= await requester.get('/api/carts');
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    expect(Array.isArray(_body)).to.be.ok;
 })
 it('Expect to delete products from cart', async function() {
    const {statusCode,ok}= await requester.delete('/api/carts/6587d182dd6648ace86bf90e/products/655ab62838b839e1b54a3840');
    expect(statusCode).to.be.equal(204);
    expect(ok).to.be.ok;

 })
//   it('Expect to purchase a cart', async function() {
//      const {statusCode,ok,_body} = await requester.post('/api/carts/65b9bb939d297fe593a125fb/purchase');
//      expect(statusCode).to.be.equal(204);
//      expect(ok).to.be.ok;
//      expect(Array.isArray(_body)).to.be.ok;
//   })
});