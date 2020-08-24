function run(io) {
  io.on("connection", function (socket) {
    console.log("\x1b[42m%s\x1b[0m", `a user connected =>> ${socket.id}`);

    socket.on("qa", function (msg) {
      socket.broadcast.emit("qa", msg);
    });

    socket.on("impro", function (msg) {
      socket.broadcast.emit("impro", msg);
    });

    socket.on("disconnect", function () {
      console.log("\x1b[43m%s\x1b[0m", `user disconnected =>> ${socket.id}`);
    });
  });
}

module.exports = run;
