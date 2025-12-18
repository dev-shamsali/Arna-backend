import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: process.env.DB_NAME
        })
        console.log("Databse connected successfully");
        
    } catch (error) {
        console.log("Database connection failed",error)
        process.exit(1);
    }
}

export default connectDB;