import mongoose from "mongoose"

const adminSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            trim:true,
            select:false
        },
    },
    {
        timestamps:true,
    }
)

export const Admin= mongoose.models.Admin || mongoose.model("Admin",adminSchema);