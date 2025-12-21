import { loginAdmin,
         logoutAdmin,
         getAdminProfile,
        } from "../controllers/auth.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";
import express from 'express'

const router = express.Router()


router.post("/login",loginAdmin)

router.post("/logout",protectAdmin,logoutAdmin)

router.get("/me",protectAdmin,getAdminProfile)
const adminRoutes= router;
export default adminRoutes;