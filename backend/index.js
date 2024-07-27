// websocket-server/index.js
import express from "express";
import { app, server } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/auth.route.js";
import conversationRouter from "./routes/conversation.route.js"
import cors from "cors";
import protectRoute from "./middlewares/protectRoute.js";

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173/',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);
app.use("/api/message",protectRoute,conversationRouter);

const PORT = process.env.PORT || 8001;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((e)=>{
  console.log(`error: ${e}`);
})
