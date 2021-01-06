import { combineReducers } from "redux";
import products from "./homeproduct";
import socket from "./socket";
import ref from "./ref";
import notif from "./notif";

const root = combineReducers({
  products,
  socket,
  notif,
  ref,
});

export default root;
