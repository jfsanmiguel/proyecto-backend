import mongoose from "mongoose";
const URI= 'mongodb+srv://jfelipesanmiguel:jQDlAZ1jURl9fTsA@cluster0.9uvwrb0.mongodb.net/'
export const init= async ()=>{
    try{
        await mongoose.connect(URI)
        console.log('Database connected succesfully')
    }catch(error){
        console.error('An unexpected error ocurred')
    }
}