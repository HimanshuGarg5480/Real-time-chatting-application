import { Router } from "express";
import { createConversation, getConversations, getSearchedUser } from "../controllers/conversationController.js";
const router = Router();

router.route("/getconversations").get(getConversations);
router.route("/createConversation").post(createConversation);
router.route("/user").get(getSearchedUser);


export default router;