//  express hello world

// 1. import express
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import logger from "morgan";
import cors from "cors";
import audit from "express-requests-logger";

//use morgan to log requests to the console

// 2. create an instance of express
const app = express();
//add cors to app
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(logger("dev"));

app.use(audit());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// io.use(logger("dev"));
// const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket);

  io.emit("chat message", ` ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

// 3. define a route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 4. start the server

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
