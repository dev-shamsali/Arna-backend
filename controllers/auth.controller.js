import { Admin } from "../models/auth.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const loginAdmin = async (req,res) =>{
   try {
     const {email,password} = req.body;
 
     if(!email || !password){
         return res.status(400).json({message:"All fields are required"})
     }
 
     const admin = await Admin.findOne({ email }).select("+password");
 
     if (!admin) {
       return res.status(401).json({ message: "Invalid credentials" });
     }
     const isMatch = await bcrypt.compare(password, admin.password);
     if(!isMatch){
         return res.status(401).json({message:"Invalid credentials"})
     }
 
     const token = jwt.sign(
       { id: admin._id },
       process.env.JWT_SECRET,
       { expiresIn: "7d" }
     );
     res.status(200).json({
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });
   } catch (error) {
     return res.status(500).json({message: "Internal Server error",error})
   }

}



export {
    loginAdmin,
}