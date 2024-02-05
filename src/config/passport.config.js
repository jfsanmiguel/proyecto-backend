import passport from "passport";
import config from "./config.js";
import { Strategy as LocalStrategy } from "passport-local";
import {Strategy as JWTStrategy,ExtractJwt} from "passport-jwt";
import { Strategy as GithubStrategy } from 'passport-github2';
import userModel from "../dao/models/user.js";
import { createHash, generateToken, isValidPassword } from "../utils.js";
import cartModel from "../dao/models/cart.js";
import CartsManager from "../dao/managersFs/CartsManager.js";
import {faker} from '@faker-js/faker';
const cookieExtractor=(req)=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies.token;
    }
    return token;
}

export const init = () => {
    const JWT_SECRET=config.jwt;
    const jwtOptions={
        secretOrKey: JWT_SECRET,
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    };

    passport.use('jwt', new JWTStrategy(jwtOptions,(payload,done)=>{
        return done(null,payload);

    }))
    const registerOpts = {
        usernameField: 'email',
       passReqToCallback: true,
     };
     const id=faker.database.mongodbObjectId();
    passport.use('register', new LocalStrategy(registerOpts, async (req, email, password, done) => {
        const {
            body: {
                first_Name,
                 last_Name,
                 age,
            },
         } = req;

         if (!first_Name ||
            !last_Name
        ) {
            return done(new Error('please fill all entries'));
         }
        const user = await userModel.findOne({ email });
        if (user) {
             return done(new Error('An user with this email already exists'));
         }
        const newCart = await cartModel.create({
            customer: email,
            products: []
         })
        const newUser = await userModel.create({
            first_Name,
             last_Name,
            email,
             password: createHash(password),
             age,
             cart: newCart._id,
         });
         done(null, newUser);

     }));
    // passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    //     
        

    // }));
    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });
    // passport.deserializeUser(async (uid, done) => { // inflar sesion
    //     if(uid===id){
    //     const user={
    //             _id: id,
    //             first_Name: 'Admin',
    //             last_Name:'Store',
    //             email:"adminCoder@coder.com",
    //             password:createHash("adminCod3r123"),
    //             age:26,
    //             role:'admin',
    //     }
    //     done(null,user);
    //     }else{
    //     const user = await userModel.findById(uid);
    //     done(null, user);
    //     }
        
    // });
     const githubOpts = {
        clientID:config.clientID,
        clientSecret:config.clientSecret,
        callbackURL:config.callbackURL,
     };
     passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshToken, profile, done) => {
         const email = profile._json.email;
        let user = await userModel.findOne({ email });
        if (user) {
             return done(null, user);
         }
       const newCart = await cartModel.create({
             customer:  profile._json.email || profile._json.name,
             products: []
         })
         user = {
            first_Name: profile._json.name,
            last_Name: '',
            email: email || '',
           password: '',
            age: 23,
             cart: newCart._id,
        };
         const newUser = await userModel.create(user);
        done(null, newUser);

     }))
}