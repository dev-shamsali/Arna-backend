import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Admin } from "../models/auth.model.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
});


const createAdmin = async () => {
  const existingAdmin = await Admin.findOne();

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await Admin.create({
    fullName: "Super Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin created successfully");
  process.exit(0);
};

createAdmin();
