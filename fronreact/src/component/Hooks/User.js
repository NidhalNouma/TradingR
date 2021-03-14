import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { uploadImg64 } from "./Firebase";

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

export const AddNewUser = function () {
  const [error, setError] = useState("");
  const [createClick, setCreateClick] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    password1: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user.password === user.confirmPassword) {
      setError("");
    }
  }, [user.confirmPassword, user.password]);

  const add = function (set, setActiv) {
    if (user.password !== user.confirmPassword) {
      setError("password not equal");
      return;
    }
    setCreateClick(true);
    setError("");
    axios({
      method: "post",
      url: "/api/user/add",
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
      .then(function (response) {
        const res = response.data;
        if (!res.add) {
          setError(res.errors);
        } else {
          setActiv(true);
          set(res.results);
        }
      })
      .catch(function (error) {
        console.log(error);
        setError("Network Error! Please try again later");
      })
      .finally(function () {
        setCreateClick(false);
      });
  };

  return { user, setUser, error, add, createClick };
};

export const UpdateUser = function (cuser, setCUser) {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: cuser.email,
    firstName: cuser.firstName,
    lastName: cuser.lastName,
    userName: cuser.userName,
    userPicture: cuser.userPicture,
  });

  function send(img) {
    axios({
      method: "post",
      url: "/api/user/update",
      data: {
        id: cuser._id,
        // email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        userPicture: img,
      },
    })
      .then(function (response) {
        const res = response.data;
        console.log(res);

        setCUser({ ...cuser, ...user });
      })
      .catch(function (error) {
        console.log(error);
        setError("Network Error! Please try again later");
      })
      .finally(function () {
        setLoad(false);
      });
  }

  function update() {
    setLoad(true);
    if (cuser.userPicture !== user.userPicture) {
      uploadImg64(user.userPicture, user.userName, send, "profile/");
    } else {
      send(user.userPicture);
    }
  }

  return { user, setUser, update, error, load };
};

export const GetUserByUserName = function (userName) {
  const [impro, setImpro] = useState(null);
  const [qas, setQas] = useState(null);
  const [user, setUser] = useState(userName);
  const [qa, setQa] = useState(1);

  useEffect(() => {
    if (user === userName)
      axios
        .get(`/api/user/usr/${userName}`)
        .then((res) => {
          if (res.data.result) {
            setUser(res.data.result);
          }
        })
        .catch((err) => console.error(err));
  }, [userName, user]);

  useEffect(() => {
    if (user._id && qa === 1 && impro === null)
      axios
        .get(`/api/product/user/impro/${user._id}`)
        .then((res) => {
          if (res.data.result) {
            setImpro(res.data.result);
          }
        })
        .catch((err) => console.error(err));
    else if (user._id && qa === 2 && qas === null)
      axios
        .get(`/api/product/user/qandas/${user._id}`)
        .then((res) => {
          console.log(res.data.result);
          if (res.data.result) {
            setQas(res.data.result);
          }
        })
        .catch((err) => console.error(err));
  }, [qa, user, impro, qas]);
  return { user, impro, qas, qa, setQa };
};

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [click, setClick] = useState(false);
  const [done, setDone] = useState(false);

  const sendMailToReset = async () => {
    if (!email) {
      setError("Email required");
      return;
    }
    setError("");
    setClick(true);
    setDone(false);
    const { data: r } = await axios.post("/api/user/reset-password", {
      email,
      type: "reset-password",
    });
    // console.log(r);
    if (r.err) {
      setError("Something wrong !! Please try again");
    } else {
      setDone(true);
    }
    setClick(false);
  };

  return { email, setEmail, error, click, done, sendMailToReset };
};
