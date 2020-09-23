import { combineReducers } from "redux";
import products from "./homeproduct";
import user from "./user";
import socket from "./socket";
import ref from "./ref";
import notif from "./notif";

const Dark = (state = false, action) => {
  if (localStorage.getItem("DARKLIGHT") === "ON") {
    return true;
  }
  switch (action.type) {
    case "ON":
      return true;
    case "OFF":
      return false;
    default:
      return false;
  }
};

const root = combineReducers({
  Dark,
  products,
  user,
  socket,
  notif,
  ref,
});

export default root;
