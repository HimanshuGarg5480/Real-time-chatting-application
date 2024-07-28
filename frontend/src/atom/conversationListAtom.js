import { atom } from "recoil";

const conversationListAtom = atom({
	key: "conversationListAtom",
	default: [],
});

export default conversationListAtom;