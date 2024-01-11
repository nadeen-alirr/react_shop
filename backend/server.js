import  express  from "express";
import  dotenv  from "dotenv";
import connectDB from "./config/db.js";
import prouductRoutes from './routes/prouductRoutes.js';
import { notfound ,errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();
import { products } from "./data/proudcts.js";
const app =express();
const port =process.env.PORT;
connectDB();

app.use('/api/prouduct',prouductRoutes);
app.use(notfound)
app.use(errorHandler);
app.listen(port,()=>{
    console.log("Server is running on port "+port);
});