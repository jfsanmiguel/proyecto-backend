import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import productRouter from './routes/api/products.router.js'
import cartRouter from './routes/api/carts.router.js'
import {__dirname} from './utils.js';
import appRouter from './routes/views/app.router.js';
import indexRouter from './routes/views/index.router.js';
import productR from './routes/views/products.router.js';
import cartR from './routes/views/carts.router.js'

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname,'../public')));
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
app.use('/', indexRouter,productR, cartR);
app.use((error,req,res,next)=>{
    const message = `An unexpected error has ocurred: ${error.message}`;
    console.error(message);
    res.status(500).json({message});

});


app.use('/api',productRouter,cartRouter);

export default app;