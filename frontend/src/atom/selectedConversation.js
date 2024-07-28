import { atom } from "recoil";

export const selectedConversationAtom = atom({
	key: "selectedConversationAtom",
	default: {
		conversationId: "",
		userId: "",
		username: "",
		userProfilePic: "",
	},
});