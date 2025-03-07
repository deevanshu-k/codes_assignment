import { Router } from "express";
import { forgotPassword, login, signUp } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/resetpassword", authMiddleware, forgotPassword);

export default router;
