import { useState, createContext } from "react";
import io from "socket.io-client";

export const Socket = () => {
  const [socket, setSocket] = useState(io("/app"));

  const onP = (fn) => {
    socket.on("PP", (p) => fn(p));
  };

  const onPP = (pr, fn) => {
    socket.on("PPs", (p) => {
      if (!pr) return;
      const r = pr.map((i) => {
        if (i._id === p._id) return p;
        return i;
      });
      fn(r);
    });
  };

  const onNot = (userId, nf, fn) => {
    socket.on("Notif", (notif) => {
      if (userId === notif.userId) fn([...nf, notif.content]);
    });
  };

  return { socket, setSocket, onP, onPP, onNot };
};

export const SocketC = createContext(null);
