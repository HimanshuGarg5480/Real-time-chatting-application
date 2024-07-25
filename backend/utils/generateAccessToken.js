import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, "access-secret-key", {
      expiresIn: "15d",
    });
};

export default generateAccessToken;