import express from 'express';
import path from 'path';
import http from 'http';
import handlebars from 'express-handlebars';
import productRouter from '../src/routes/api/products.router.js'
import cartRouter from '../src/routes/api/carts.router.js'
import {__dirname} from '../src/utils.js';
import appRouter from '../src/routes/api/app.router.js';
import indexRouter from '../src/routes/views/index.router.js';
import productR from '../src/routes/views/products.router.js';
import cartR from '../src/routes/views/carts.router.js';
import {init as initPassport} from '../src/config/passport.config.js'
import session from 'express-session';
//import FileStorage from 'session-file-store';
import MongoStore from 'connect-mongo';
import { URI } from '../src/utils.js';
import sessionRouter from '../src/routes/api/session.router.js';
import passport from 'passport';
import {initSocket} from '../src/socket.js';
import {init} from '../src/db/mongodb.js';

import ProductService from '../src/services/products.service.js';
import CartService from '../src/services/carts.service.js';
import UserService from '../src/services/user.service.js';

const SESSION_SECRET='[sPa4j8M646['
const app=express();
//const fileStorage = FileStorage(session);

app.use(session({
    store:MongoStore.create({
        mongoUrl: URI,
        mongoOptions: {},
        ttl: 3600,
    })   ,//new fileStorage({path:path.join(__dirname,'sessions'),ttl: 100, retries:0}),firsestore
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname,'../public')));
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
initPassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter,productR, cartR);
app.use((error,req,res,next)=>{
    const message = `An unexpected error has ocurred: ${error.message}`;
    console.error(message);
    res.status(500).json({message});

});


app.use('/api',productRouter,cartRouter,sessionRouter);

await init();


const httpServer= http.createServer(app);
initSocket(httpServer);
const PORT=8080;

httpServer.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

async function test(){
let testOK=0;
let testFailed=0;    
let resultP= await ProductService.getAll();
let resultC= await CartService.getAll();
let resultU= await UserService.getAll();
if(resultP===null || resultC===null || resultU===null){
    console.log("Error to access database")
    testFailed++;
}else{
    console.log(resultP);
    console.log("------------------")
    console.log(resultC);
    console.log("------------------")
    console.log(resultU);
    console.log("------------------")
    testOK++;
}
resultP=await ProductService.getById('655ab06b38b839e1b54a3821');
resultC=await CartService.getById('656701762fc54b7d71401530');
resultU=await UserService.getById('65a4ab5d079fb452c6bdb362');

if(resultP===null || resultC===null || resultU===null){
    console.log("Error search in database")
    testFailed++;
}else{
    console.log(resultP);
    console.log("------------------")
    console.log(resultC);
    console.log("------------------")
    console.log(resultU);
    console.log("------------------")
    testOK++;
}
resultP={
    title: "test product",
    description: "fungus 0",
    price: 100,
    thumbnail: [
        "No image"
    ],
    code: "t0",
    status: false,
    stock: 12,
    category: "fungi"
};
resultC={
customer:"test customer",
products:[]
};
resultU={   
first_Name:"test",
last_Name:"user",
email:"test@mail.com",
age:31,
role:"user"
};
await ProductService.updateById('656a250c86a1dff1a935d69c',resultP);
await CartService.updateById('6587aee4227b7f8ccdaaeb93',resultC);
await UserService.updateById('6587aee5227b7f8ccdaaeb95',resultU);
testOK++;

await ProductService.deleteById('65aecfd02e0bbd1077560940');
await CartService.deleteById('65af1cf1e17ad9fef4a2560d');
await UserService.deleteById('6587d182dd6648ace86bf910');
testOK++;



console.log("Test approved:"+testOK);
console.log("Test Failed:"+testFailed);
}



test();


