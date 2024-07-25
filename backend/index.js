// websocket-server/index.js
import express from "express";
import { app,server } from "./app.js";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
