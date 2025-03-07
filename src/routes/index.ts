import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import pageRouter from "./page.router";

const router = Router();

router.use("", pageRouter);
router.use("/v1/api/user", userRouter);
router.use("/v1/api/auth", authRouter);

export default router;
