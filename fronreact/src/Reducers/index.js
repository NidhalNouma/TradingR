import { combineReducers } from "redux";
import products from "./homeproduct";
import user from "./user";
import socket from "./socket";
import ref from "./ref";

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
  ref,
});

export default root;