import { Router } from "express";
import userModel from '../../dao/models/user.js';

const router = Router();

router.post('/session/register', async (req, res) => {
    const {
        body: {
            first_Name,
            last_Name,
            email,
            password,
            age,
        },
    } = req;
    if (!first_Name ||
        !last_Name ||
        !email ||
        !password){
            return res.render('error',{title:'log error',messageError:'please fill all entries'});
        }
const user= await userModel.create({
    first_Name,
    last_Name,
    email,
    password,
    age,
});

//res.status(201).json(user);
res.redirect('/login');
  
});
router.post('/session/login', async (req, res) => {
    const { body: { email, password },} = req;
    if ( !email ||!password){
            //return res.status(400).json({ message: 'please fill all entries'})
            return res.render('error',{title:'log error',messageError:'please fill all entries'});
        }
        const user= await userModel.findOne({ email });
        if(!user){
            //return res.status(401).json({ message: 'invalid email or password'})
            return res.render('error',{title:'log error',messageError:'invalid email or password'});
        }
        if(user.password != password){
            //return res.status(401).json({ message: 'invalid email or password'})
            return res.render('error',{title:'log error',messageError:'invalid email or password'});
        }
        const {
            first_Name,
            last_Name, 
        }=user;
        req.session.user={
            first_Name,
            last_Name,
            email,
        }
        //res.status(200).json({message: 'Welcome back'})
        res.redirect('/profile')
 });
router.get('/session/profile', (req, res) => {
    if(!req.session.user){
        return res.status(401).json({message: 'you are not logged in'})
    }
    res.status(200).json(req.session.user)
 });

 router.get('/session/logout', (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            return res.render('error',{title:'log error',messageError:error.message});
        }
        res.redirect('/login');
      
    })
 })

export default router
