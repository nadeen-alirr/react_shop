import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import { products } from "./data/proudcts.js";
import User from "./models/Usermodel.js";
import Proudcts from "./models/Prouductmodel.js";
import Order from "./models/Orderschema.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importdata= async()=>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Proudcts.deleteMany();
        console.log("deleted")

        const createdusers_db= await User.insertMany(users);
        console.log("insert array users")
        const admin= createdusers_db[0]._id;
        console.log(admin)
        const sampleprouducts= products.map((product)=> {
            return ({...product,user:admin}) 
        })
        console.log(sampleprouducts)
         await Proudcts.insertMany(sampleprouducts)
         console.log('insert prouduct')

        //sucsess
        console.log('data_imported'.green.inverse);
        process.exit(0);

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}
const destroy_data = async () => {
    try {
        await User.deleteMany();
        await Proudcts.deleteMany();
        await Order.deleteMany();
        console.log('data_destroyed'.red.inverse);
        process.exit(0);
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){ //undefiened
    
    importdata();
}
else{
    destroy_data();
}

