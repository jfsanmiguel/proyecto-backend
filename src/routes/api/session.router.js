import { Router } from "express";
import passport from "passport";
import userModel from '../../dao/models/user.js';
import { createHash, isValidPassword } from "../../utils.js";

//http://localhost:8080/api/session/github/callback
// client Iv1.5b323af19395be41 sensible
//secret 1cb4be9e60b19160c02f5084e06b72cdfecb5f59 sensible

const router = Router();

router.post('/session/register', passport.authenticate('register', { failureRedirect: '/register' }), async (req, res) => {
    //     const {
    //         body: {
    //             first_Name,
    //             last_Name,
    //             email,
    //             password,
    //             age,
    //         },
    //     } = req;
    //     if (!first_Name ||
    //         !last_Name ||
    //         !email ||
    //         !password){
    //             return res.render('error',{title:'log error',messageError:'please fill all entries'});
    //         }
    // const user= await userModel.create({
    //     first_Name,
    //     last_Name,
    //     email,
    //     password: createHash(password),
    //     age,
    // });



    //res.status(201).json(user);
    res.redirect('/login');

});
router.post('/session/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    // const { body: { email, password },} = req;
    // if ( !email ||!password){
    //         //return res.status(400).json({ message: 'please fill all entries'})
    //         return res.render('error',{title:'log error',messageError:'please fill all entries'});
    //     }
    //     const user= await userModel.findOne({ email });
    //     if(!user){
    //         //return res.status(401).json({ message: 'invalid email or password'})
    //         return res.render('error',{title:'log error',messageError:'invalid email or password'});
    //     }
    //     const pass= isValidPassword(password,user)
    //     if(!pass){
    //         //return res.status(401).json({ message: 'invalid email or password'})
    //         return res.render('error',{title:'log error',messageError:'invalid email or password'});
    //     }
    //     const {
    //         first_Name,
    //         last_Name, 
    //     }=user;
    //     req.session.user={
    //         first_Name,
    //         last_Name,
    //         email,
    //     }
    //     //res.status(200).json({message: 'Welcome back'})
    res.redirect('/profile')
});
router.get('/session/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'you are not logged in' })
    }
    res.status(200).json(req.session.user)
});

router.get('/session/current', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'you are not logged in' })
    }
    res.status(200).json(req.session.user)
});

router.get('/session/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.render('error', { title: 'log error', messageError: error.message });
        }
        res.redirect('/login');

    });
});

router.post('/session/password-recover', async (req, res) => {
    const { body: { email, password }, } = req;
    if (!email || !password) {
        //return res.status(400).json({ message: 'please fill all entries'})
        return res.render('error', { title: 'log error', messageError: 'please fill all entries' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        //return res.status(401).json({ message: 'invalid email or password'})
        return res.render('error', { title: 'log error', messageError: 'invalid email or password' });
    }
    user.password = createHash(password);
    await userModel.updateOne({ email }, user);
    res.redirect('/login');

})

router.get('/session/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/session/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile');
});


export default router
