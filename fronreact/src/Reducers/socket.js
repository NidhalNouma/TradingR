import io from "socket.io-client";

export default (state = io, action) => {
  switch (action.type) {
    case "START": {
      if (typeof state === "function") return state();
      else return state;
    }
    case "EMIT":
      return state.emit(action.payload.type, action.payload.sub);
    case "ONS": {
      return state.on("impro", (msg) => {
        if (typeof action.payload.d === "function") action.payload.d(msg);
        if (typeof action.payload.r === "function") action.payload.r();
      });
    }
    case "ONSA": {
      return state.on("improAns", (msg) => {
        if (typeof action.payload.d === "function") action.payload.d(msg);
        if (typeof action.payload.r === "function") action.payload.r();
      });
    }
    case "ONQ": {
      return state.on("qa", (msg) => {
        if (typeof action.payload.d === "function") action.payload.d(msg);
        if (typeof action.payload.r === "function") action.payload.r();
      });
    }
    case "ONQA": {
      return state.on("qaAns", (msg) => {
        if (typeof action.payload.d === "function") action.payload.d(msg);
        if (typeof action.payload.r === "function") action.payload.r();
      });
    }
    case "ON+": {
      return state.on("1", (msg) => {
        if (typeof action.payload.d === "function") action.payload.d(msg);
        if (typeof action.payload.r === "function") action.payload.r();
        if (
          typeof action.payload.n === "function" &&
          msg.authId === action.payload.id
        ) {
          const notif = {
            new: true,
            at: new Date().toLocaleDateString(),
            readed: false,
            product: {
              _id: msg.productId,
              img: msg.img,
            },
            message: `${msg.userName} vate + to your impro`,
          };
          action.payload.n(notif);
        }
      });
    }
    case "ON-": {
      return state.on("-1", (msg) => {
        if (typeof action.payload.d === "function") action.payload.d(msg);
        if (typeof action.payload.r === "function") action.payload.r();
        if (
          typeof action.payload.n === "function" &&
          msg.authId === action.payload.id
        ) {
          const notif = {
            new: true,
            at: new Date().toLocaleDateString(),
            readed: false,
            product: {
              _id: msg.productId,
              img: msg.img,
            },
            message: `${msg.userName} vate - to your impro`,
          };
          action.payload.n(notif);
        }
      });
    }
    case "REMOVELISTNER": {
      state.off("-1");
      state.off("1");
      state.off("qaAns");
      state.off("qa");
      state.off("improAns");
      state.off("impro");
    }
    default:
      return state;
  }
};
