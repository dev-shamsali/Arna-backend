import { loginAdmin } from "../controllers/auth.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";
import express from 'express'

const router = express.Router()


router.post("/login",loginAdmin)



const adminRoutes= router;
export default adminRoutes;