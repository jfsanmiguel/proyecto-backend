import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import {__dirname} from './utils.js';
import appRouter from './routes/app.router.js';

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname,'../public')));
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
app.use('/', appRouter);
app.use((error,req,res,next)=>{
    const message = `An unexpected error has ocurred: ${error.message}`;
    console.error(message);
    res.status(500).json({message});

});
app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Fungstore"})
})
app.use('/api',productRouter,cartRouter);

export default app;