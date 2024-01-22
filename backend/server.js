import  express  from "express";
import  dotenv  from "dotenv";
import connectDB from "./config/db.js";
import prouductRoutes from './routes/prouductRoutes.js';
import { notfound ,errorHandler} from "./middleware/errorMiddleware.js";
import userroutes from './routes/userroutes.js'
import { products } from "./data/proudcts.js";
import cookieParser from 'cookie-parser';
//.env 
dotenv.config();

const app =express();
const port =process.env.PORT;

//db connection
connectDB();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(cookieParser());

//rotes middleware
app.use('/api/prouduct', prouductRoutes);
app.use('/api/user',userroutes);

//error middleware
app.use(notfound)
app.use(errorHandler);


app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
});


app.listen(port,()=>{
    console.log("Server is running on port "+port);
});