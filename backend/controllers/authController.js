import User from "../models/user.model.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import bcrypt from "bcrypt"

const signupUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();

    if (email == "" || password == "" || username == "") {
      return res.status(400).json({ error: "All fields are requi587red" });
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email entered" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password too short (minimum 8 characters)" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    res.status(200).json({
        message: "registered successfully",
        accessToken,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err);
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      // Generate tokens
      const accessToken = generateAccessToken(user);
  
      // Send the tokens as response
      res.status(200).json({message:"logined successfully", accessToken });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

export {signupUser,loginUser}
