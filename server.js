import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.config.js"
import adminRoutes from "./routes/admin.route.js"
dotenv.config()
const app = express();
app.use(cors({
    origin:[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://arna-skincare.vercel.app"
    ],
    credentials:true,
}))
app.use(express.json());
const PORT = process.env.PORT || 7000 

connectDB();
app.get("/",(req,res) =>{
    res.send("Arna Backend is running ")
})



app.use("/api/admin",adminRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})