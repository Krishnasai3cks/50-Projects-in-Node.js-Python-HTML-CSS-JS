const express = require("express");
const app = express();
const http = require("http").createServer(app);
const routes = require("./routes");
const path = require("path");
const port = process.env.PORT;
let io = require("socket.io")(http);
routes(app, __dirname);
http.listen(port || 3000, () => {
    console.log("app listening on port ", 3000);
});

io.sockets.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("user-connected", userId);

        socket.on("disconnect", () => {
            socket.to(roomId).broadcast.emit("user-disconnected", userId);
        });
    });
});