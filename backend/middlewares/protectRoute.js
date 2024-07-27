import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    
    if (!token)
      return res
        .status(401)
        .json({ error: "Unauthorized user (access denied)" });

    const decoded = jwt.verify(token, "access-secret-key");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid access token" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in protectRoute folder: ", err.message);
  }
};

export default protectRoute;