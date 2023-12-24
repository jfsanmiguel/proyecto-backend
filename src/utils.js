import path from 'path';
import bcrypt from 'bcrypt';
import url from 'url';

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