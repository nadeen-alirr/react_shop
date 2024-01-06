import  express  from "express";
import  dotenv  from "dotenv";

dotenv.config();
//  import cors from "cors";
//  app.use(cors());
//  import bodyParser from "body-parser";

import { products } from "./data/proudcts.js";
const app =express();
const port =process.env.PORT;

app.get('/',(req,res)=>{
    res.send('api is running');
});

app.get('/api/prouduct',(req,res)=>{
    res.json(products);
});

app.get('/api/prouduct/:id',(req,res)=>{
    const product= products.find((p)=> p._id === req.params.id
    )
    res.json(product);
});
app.listen(port,()=>{
    console.log("Server is running on port "+port);
});