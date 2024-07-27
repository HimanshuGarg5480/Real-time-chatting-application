import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js"

async function getConversations(req, res) {
  const userId = req.user._id;
  try {
    const conversations = await Conversation.find({
      participants: userId,
    }).populate({
      path: "participants",
      select: "username profilePic",
    });

    // remove the current user from the participants array
    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
    });
    res.status(200).json({ user: req.user, conversations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSearchedUser(req, res) {
  const searchTerm = req.query.name || '';
  try { 
    // Use regex for case-insensitive search in MongoDB
    const users = await User.find({
      username: { $regex: '^' + searchTerm, $options: 'i' },
    }).select("-password");
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {getConversations,getSearchedUser}
