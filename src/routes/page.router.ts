import { Router } from "express";
import { updatePassword } from "../controllers/page.controller";

const router = Router();

router.get("/updatepassword", updatePassword);

export default router;
