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
      // console.log(pr);
      const r = pr.map((i) => {
        if (i._id === p._id) return p;
        return i;
      });
      fn(r);
    });
  };

  return { socket, setSocket, onP, onPP };
};

export const SocketC = createContext(null);
