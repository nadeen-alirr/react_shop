import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connecting to MongoDB ${db.connection.host}`)
    } catch (error) {
        console.log(error);  
    }
}
export default connectDB ;
