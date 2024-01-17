import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
	})
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
let chatHistory = [];

io.on("connection", (socket) => {
  socket.emit("chatHistory", chatHistory);
  socket.on("userConnected", (userDetails) => {
    const message = {
      type: 'userConnected',
      message: `${userDetails.customerName} has joined the chat`,
    };
    chatHistory.push(message);
    socket.broadcast.emit("userConnected", message);
  });

  socket.on("chatMessage", (message) => {
    const chatMessage = {
      type: 'chatMessage',
      id: socket.id,
      message: message,
    };
    chatHistory.push(chatMessage);
    io.emit("chatMessage", chatMessage);
  });

  socket.on("userDisconnected", (userDetails) => {
    const message = {
      type: 'userDisconnected',
      message: `${userDetails.customerName} has left the chat`,
    };
    chatHistory.push(message);
    io.emit("userDisconnected", message);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
