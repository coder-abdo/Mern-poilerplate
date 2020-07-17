import { Router } from "express";
import { auth } from "../middlewares/auth";
import { register, login, getAuth, logout } from "../controllers/user";

const router = Router();
router.get("/api/users/auth", auth, getAuth);
router.post("/api/users/register", register);
router.post("/api/users/login", login);
router.get("/api/users/logout", auth, logout);
export default router;
