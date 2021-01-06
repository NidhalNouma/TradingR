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
  const r = axios({
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
