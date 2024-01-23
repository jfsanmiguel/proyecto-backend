import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import productRouter from './routes/api/products.router.js'
import cartRouter from './routes/api/carts.router.js'
import {Exception, __dirname} from './utils.js';
import appRouter from './routes/views/app.router.js';
import indexRouter from './routes/views/index.router.js';
import productR from './routes/views/products.router.js';
import cartR from './routes/views/carts.router.js';
import {init as initPassport} from './config/passport.config.js'
import session from 'express-session';
//import FileStorage from 'session-file-store';
import MongoStore from 'connect-mongo';
import { URI } from './utils.js';
import sessionRouter from './routes/api/session.router.js';
import passport from 'passport';
import config from './config/config.js';
import apiRouter from './routes/api/app.router.js'
import cors from 'cors';

const SESSION_SECRET=config.session;
// const whiteList= process.env.ORIGINS_ALLOWED.split(',');
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
// app.use(cors({
//     origin: (origin,callback)=>{
//         if(whiteList.includes(origin)){
//             callback(null,true);
//         }else{
//             callback(new Error('not allowed by CORS'))
//         }

//     }
// }));


app.use('/', indexRouter,productR, cartR);

app.use((error,req,res,next)=>{
    const message = error instanceof Exception ? error.message:`An unexpected error has ocurred`;
    console.error(message);
    res.status(500).json({message});

});

app.use('/api',productRouter,cartRouter,sessionRouter,apiRouter);

export default app;