import asynHandler from '../middleware/asynchandler.js';
import Proudcts from '../models/Prouductmodel.js';
 
const getProuduct =asynHandler(async (req,res)=>{
    const products = await Proudcts.find({});
    //    throw new Error
    //    ('some error')
       res.json(products);
})


const getpruductByID=asynHandler(async(req,res)=>{
    const product= await Proudcts.findById(req.params.id)
    if(product){
       return res.json(product);
    }else{
     res.status(404);
        throw new Error('product not found')
    }
}
)

export {getProuduct,getpruductByID }
