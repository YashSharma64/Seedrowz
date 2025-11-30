
import express from "express";
import { register, login, getUsers } from "../controllers/userController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authRequired, getUsers);

export default router;
