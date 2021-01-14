import { useState, createContext } from "react";
import axios from "axios";

export const UserC = createContext(null);

export const User = () => {
  const [user, setUser] = useState(getUserDom());

  return { user, setUser };
};

function getUserDom() {
  let r = null;
  const data = document.getElementById("data");
  if (data) {
    const st = data.innerHTML;
    if (st !== "!!data!!") r = JSON.parse(st);
    data.remove();
  }
  return r;
}

export const getUser = async (email, password) => {
  const r = await axios({
    method: "post",
    url: "/api/user/find",
    data: {
      email,
      password,
    },
  });
  const res = r.data.result;

  return res;
};

export const findSubs = async (_id, setStr, setInd) => {
  const r = await axios({
    method: "get",
    url: "/api/product/user/subscriptions/" + _id,
  });
  const res = r.data.result;
  if (res) {
    setStr(res.filter((i) => i.type === "EA"));
    setInd(res.filter((i) => i.type === "Indicator"));
  } else {
    setInd(null);
    setStr(null);
  }
  return res;
};

export const setLastTime = async (_id) => {
  if (!_id) return;
  const r = await axios({
    method: "post",
    url: "/api/user/lasttime/" + _id,
  });
  const res = r.data.result;
  return res;
};
