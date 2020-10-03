const express = require("express");
const socketio = require("socket.io");

const http = require("http");
const app = express();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("a user connected!");
  socket.on("user-connects", ({ username, room }) => {
    socket.join(room);
    socket.emit("welcome-user", { text: `Welcome ${username}!` });
  });
  socket.on("send-message", ({ text, username, room }) => {
    socket.broadcast.to(room).emit("display-message", { text, username });
  });
  socket.on("disconnect", () => {
    console.log("user left ):");
  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
