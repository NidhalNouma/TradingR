function run(io) {
  io.of("app").on("connection", function (socket) {
    console.log("\x1b[34m%s\x1b[0m", `a user connected =>> ${socket.id}`);

    socket.on("PP", function (msg) {
      socket.broadcast.emit("PP", msg);
      socket.broadcast.emit("PPs", msg);
    });

    socket.on("Notif", function (msg) {
      socket.broadcast.emit("Notif", msg);
    });

    socket.on("disconnect", function () {
      console.log("\x1b[33m%s\x1b[0m", `user disconnected =>> ${socket.id}`);
    });
  });
}

module.exports = run;
