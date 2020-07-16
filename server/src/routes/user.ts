import { Router } from "express";
import { register, login } from "../controllers/user";

const router = Router();

router.post("/api/users/register", register);
router.post("/api/users/login", login);

export default router;
