function run(io) {
  io.on("connection", function (socket) {
    console.log("a user connected", socket.id);

    socket.on("qa", function (msg) {
      console.log("qa", msg);
      io.emit("qa", msg);
    });

    socket.on("impro", function (msg) {
      console.log("impro", msg);
      io.emit("impro", msg);
    });

    socket.on("disconnect", function () {
      console.log("user disconnected", socket.id);
    });
  });
}

module.exports = run;
