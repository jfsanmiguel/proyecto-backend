import { expect } from "chai";
import supertest from "supertest";
import { createHash } from "../../src/utils.js";
import { logger } from "../../src/config/logger.js";

const requester= supertest('http://localhost:8080');

describe('Fungstore auth testing', function() {
before(function() {
    this.cookie={};
    this.email='';
});
it('Expect to register an user',async function() {
    this.email=`testuser${Date.now()/3600}@mail.com`;
    const newCart ={
        customer: this.email,
        products: []
     }
    const result = await requester.post('/api/carts').send(newCart);
    const user ={
        first_Name:'test user',
         last_Name:'customer',
         email:this.email,
         password: createHash("test123"),
         age:"99",
         cart: newCart._id,
     };
    const {statusCode} = await requester.post('/api/session/register').send(user)
    expect(statusCode).to.be.ok;
    logger.debug('register successful')
});
it('Expect to log an user in', async function() {
const userLog={
    email:'hola@mail.com',
    password:'hongosOrellanas',
};
const {headers,statusCode,_body,ok}=requester.post('/api/session/login').send(userLog);
console.log('_body',_body);
console.log('headers',headers);
const [key,value]=headers['set-cookie'][0].split('=');
console.log('key',key);
console.log('value',value);
this.cookie.key=key;
this.cookie.value=value;
console.log(this.cookie);
logger.debug('logged successfully');
//token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjlkOTJhYWVlZTkxN2MzZjQzMDMxOSIsImZpcnN0X05hbWUiOiJqdWFuIiwibGFzdF9OYW1lIjoic2FuIiwiZW1haWwiOiJob2xhQG1haWwuY29tIiwiY2FydCI6IjY1YjlkOTI5YWVlZTkxN2MzZjQzMDMxNyIsInJvbGUiOiJ1c2VyIiwidHlwZSI6ImF1dGhlbnRpY2F0aW9uIiwiaWF0IjoxNzA5NzAzMjc1LCJleHAiOjE3MDk3MDY4NzV9.xnQBKjkXZAn2jURRcmZa3vAxIeuWvLoYXBD2Xjir6wc; Path=/; HttpOnly; Expires=Wed, 06 Mar 2024 05:35:35 GMT;
});
it('Expect to obtain user information', async function() {
    const {headers,statusCode,_body,ok}=(await requester.get('/api/session/current')).setEncoding('Cookie',[`${this.cookie.key}=${this.cookie.value}`]);
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    expect(_body).to.have.property('payload');
    console.log('_body',_body);


});

});