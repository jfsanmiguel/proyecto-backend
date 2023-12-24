import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {Strategy as GithubStrategy} from 'passport-github2';
import userModel from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import cartModel from "../dao/models/cart.js";

export const init = () => {
    const registerOpts = {
        usernameField: 'email',
        passReqToCallback: true,
    };
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
        const newCart= await cartModel.create({
            customer:first_Name,
            products:[]
        })
        const newUser = await userModel.create({
            first_Name,
            last_Name,
            email,
            password: createHash(password),
            age,
            cart: newCart._id,
        });
        done(null,newUser);

    }));
    passport.use('login', new LocalStrategy({ usernameField: 'email'}, async(email,password,done) => {
        const user = await userModel.findOne({ email });
        if(!user){
            return done(new Error('invalid email or password'));
        }
        const pass= isValidPassword(password,user)
        if(!pass){
            return done(new Error('invalid email or password')); 
        }
        done(null,user);

    }));
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async(uid,done)=>{ // inflar sesion
        const user=await userModel.findById(uid);
        done(null,user);
    });
const githubOpts={
    clientID:'Iv1.5b323af19395be41',
    clientSecret: "1cb4be9e60b19160c02f5084e06b72cdfecb5f59",
    callbackURL: 'http://localhost:8080/api/session/github/callback',
};
    passport.use('github', new GithubStrategy(githubOpts, async(accesstoken,refreshToken,profile,done)=>{
        const email= profile._json.email;
        let user= await userModel.findOne({email});
        if(user){
            return done(null,user);
        }
        const newCart= await cartModel.create({
            customer:profile._json.name,
            products:[]
        })
        user={
            first_Name: profile._json.name,
            last_Name: '',
            email: email || '',
            password: '',
            age: 23,
            cart: newCart._id
        };
        const newUser= await userModel.create(user);
        done(null,newUser);

    }))
}