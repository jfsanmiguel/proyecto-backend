import { Router } from "express";
import product from "../../dao/models/product.js";
const router = Router();
import { buildResponsePaginated } from "../../utils.js";

router.get('/products', async (req, res) => {
    const {limit=10,page=1, sort, search }=req.query;
        //const products = await productmanager.getProducts();
        //const products= await PM.getProducts();
        const criteria={};
        const options={limit,page};
        if(sort){
            options.sort= {price:sort};
        }
        if(search){
            criteria.category=search;
        }
        const result= await product.paginate(criteria,options);
        const data=buildResponsePaginated({...result,search});
        res.render('pagination',{title:'Fungstore',...data});
});


export default router