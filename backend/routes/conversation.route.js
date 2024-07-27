import { Router } from "express";
import { getConversations, getSearchedUser } from "../controllers/conversationController.js";
const router = Router();

router.route("/getconversations").get(getConversations);
router.route("/user").get(getSearchedUser);

export default router;