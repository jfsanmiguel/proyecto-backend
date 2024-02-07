import { Router } from "express";
const router=Router();

router.get('/loggerTest', (req,res)=>{
    req.logger.info('hello from request index home')
    req.logger.error('error test')
    req.logger.warning('test warning')
    req.logger.fatal('fatal test')
    req.logger.http('http')
    req.logger.debug('test debug')
    res.status(200).json({message:'Hello from backend'})
 })


 export default router;