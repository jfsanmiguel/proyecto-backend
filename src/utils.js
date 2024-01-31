import path from 'path';
import bcrypt from 'bcrypt';
import url from 'url';
import {faker} from '@faker-js/faker';

const __filename= url.fileURLToPath(import.meta.url);
export const __dirname=path.dirname(__filename);
export const URL_BASE='http://localhost:8080'
export const URI= 'mongodb+srv://jfelipesanmiguel:jQDlAZ1jURl9fTsA@cluster0.9uvwrb0.mongodb.net/'

export const createHash = (password) => {
    const result = bcrypt.hashSync(password, bcrypt.genSaltSync(13));
    return result;
}

export const isValidPassword= (password,user)=>{
    const result= bcrypt.compareSync(password,user.password);
    return result;
}


export const buildResponsePaginated= (data)=>{
    return {
        status: 'success',
        payload: data.docs.map((doc)=>doc.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage:data.nextPage,
        page:data.page,
        hasPrevPage:data.hasPrevPage,
        hasNextPage:data.hasNextPage,
        prevLink: data.hasPrevPage?`${URL_BASE}/api/products/?page=${data.prevPage}&limit=${data.limit}`: null,
        nextLink:data.hasNextPage?`${URL_BASE}/api/products/?page=${data.nextPage}&limit=${data.limit}`: null,


    }

}

export const authMiddleware= roles=>(req,res,next)=>{
    const {user}= req;
    if(!user){
        return res.status(401).json({message:'unauthorized'});
    }
    if(!roles.include(user.role)){
        return res.status(403).json({message:'forbidden'});
    }
    next();

};


export class Exception extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }

   
}
export class BadRequestException extends Exception{
     constructor(message){
        super(message,400);
     }   
}

export class NotFound extends Exception{
    constructor(message){
       super(message,404);
    }   
}
export class Unauthorized extends Exception{
    constructor(message){
       super(message,401);
    }   
}
export class Forbidden extends Exception{
    constructor(message){
       super(message,403);
    }   
}

export const generateProduct=() =>{
 return{
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price:faker.commerce.price() ,
    thumbnail: faker.image.url(),
    code: faker.string.alphanumeric({length:2}),
    status: true,
    stock: faker.number.int({min:1, max:99}),
    category: faker.commerce.department() ,
 }
};

