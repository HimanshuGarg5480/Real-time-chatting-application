import express from "express"
import http from "http"
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("typing", (isTyping) => {
    socket.broadcast.emit("typing", isTyping);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export { io, server, app };
