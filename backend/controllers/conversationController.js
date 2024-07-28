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

    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
    });
    console.log(conversations);
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

async function createConversation(req, res) {
	try {
		const { recipientId} = req.body;
    const senderId = req.user._id;

    if(!recipientId){
      res.status(400).json({error:'provide recipientId'})
    }

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, recipientId] },
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, recipientId],
			});
			await conversation.save();
		}

    conversation = await Conversation.findOne({
			participants: { $all: [senderId, recipientId] },
		}).populate({
      path: "participants",
      select: "username profilePic",
    });

    
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== senderId.toString()
      );
    

		res.status(201).json({conversation,message:"conversation created!!"});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}


export {getConversations,getSearchedUser, createConversation}
