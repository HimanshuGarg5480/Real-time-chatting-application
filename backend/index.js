// websocket-server/index.js
import express from "express";
import { app, server } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8001;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((e)=>{
  console.log(`error: ${e}`);
})
