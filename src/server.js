const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const connectedUsers = {};

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

app.use(cors());
mongoose.connect(
  "mongodb+srv://dave:88169976@cluster0-49yqn.mongodb.net/tinderFG?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  next();
});

app.use(express.json());
app.use(routes);

app.listen(3333);
