import { Router } from "express";
import { loginUser, signupUser } from "../controllers/authController.js";
const router = Router();

router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);

export default router;