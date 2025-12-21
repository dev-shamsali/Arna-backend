import { Admin } from "../models/auth.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        admin: {
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
        },
      });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server error"})
  }

}

const logoutAdmin = (req, res) => {
  res
    .clearCookie("adminToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

const getAdminProfile = async (req, res) => {
  try {
    // req.admin is already attached by protectAdmin middleware
    res.status(200).json({
      admin: {
        id: req.admin._id,
        fullName: req.admin.fullName,
        email: req.admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};



export {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
}