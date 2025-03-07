import { Router } from "express";
import {
    forgotPassword,
    login,
    resetPassword,
    signUp,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/resetpasswordrequest", authMiddleware, forgotPassword);
router.post("/resetpassword", resetPassword);

export default router;
