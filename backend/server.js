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
    console.log(username, room);
  });
  socket.on("disconnect", () => {
    console.log("user left ):");
  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
