import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
