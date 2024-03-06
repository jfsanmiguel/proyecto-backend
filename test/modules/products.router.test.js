import { expect } from "chai";
import supertest from "supertest";
import { generateProduct } from "../../src/utils.js";
import {logger} from "../../src/config/logger.js"

const requester= supertest('http://localhost:8080');

describe('Fungstore products testing', function() {
// it('Expect to add a new product', async function(){
//     const {statusCode,ok,_body} = await requester.post('api/products').send(generateProduct());
//     logger.debug(statusCode,ok,_body);
//     expect(statusCode).to.be.equal(201);
//     expect(ok).to.be.ok;
//     expect(_body).to.have.property('status','success');
//     expect(_body).to.have.property('payload');
//     expect(_body.payload).to.have.property('status',true);
// })

it('Expect to obtain product list', async function(){
    const {statusCode,ok,_body}= await requester.get('/api/products');
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    expect(_body).to.have.property('status')
    expect(_body).to.have.property('payload');
    expect(Array.isArray(_body.payload)).to.be.ok;

});

// it('Expect to update product',async function(){
//     const productMock={
//         title:"Champignon",
//         description:"Fungus 99",
//         price:123,
//         thumbnail:[],
//         code:"m123",
//         stock:99,
//         category:"fungi",
//     }
// const {_body:{payload:{_id}}}=await requester.post('/api/products').send(productMock);
// let {statusCode,ok}= (await requester.put(`/api/products/${_id}`)).send({
//     title:"Fungus 9",
//     description:"Fungus 9",
//     price:321,
//     thumbnail:[],
//     code:"m123",
//     stock:99,
//     category:"fungi",
// });
// expect(statusCode).to.be.equal(200);
// expect(ok).to.be.ok;
// const result= await requester.get(`/api/products/${_id}`);
// logger.debug('result',result._body);

// });
it('Expect to obtain product by id', async function(){
    const {statusCode,ok,_body}= await requester.get('/api/products/6563fd976f81f67b334ecdea');
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    logger.debug(_body);
    expect(_body).to.have.property('_id','6563fd976f81f67b334ecdea');
    expect(_body).to.have.property('category','vegetable');
});
it('Expect to delete product by id', async function() {
    const {statusCode,ok,_body}= await requester.delete('/api/products/65b98a755f9d839a96290e81');
    expect(statusCode).to.be.equal(204);
    expect(ok).to.be.ok;
});
it('Expect to create 100 mocking products', async function() {
    await mongoose.connection.collections.products.drop();
    const {statusCode}= await requester.post('/api/mockingproducts');
    const {ok,_body}= await requester.get('/api/products');
    expect(statusCode).to.be.equal(201);
    expect(ok).to.be.ok;
    expect(_body).to.have.property('status')
    expect(_body).to.have.property('payload');
    expect(Array.isArray(_body.payload)).to.be.ok;  
} )
});
