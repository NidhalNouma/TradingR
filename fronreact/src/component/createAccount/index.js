import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import Google from "../../asset/images/Google";
import Facebook from "../../asset/images/Facebook";

import { User } from "../../Actions";

export default function CreateAccount(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [createClick, setCreateClick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (password === conpassword) {
      setError("");
    }
  }, [conpassword, password]);

  const diss = (e) => {
    props.dissmis();
  };

  const setemail = (e) => {
    setEmail(e.target.value);
  };

  const setusername = (e) => {
    setUsername(e.target.value);
  };

  const setpassword = (e) => {
    setPassword(e.target.value);
  };

  const setconpassword = (e) => {
    setConPassword(e.target.value);
  };

  const addUser = (e) => {
    e.preventDefault();
    if (password !== conpassword) {
      setError("password not equal");
      return;
    }
    setCreateClick(true);
    setError("");
    axios({
      method: "post",
      url: "/api/user/add",
      data: {
        email,
        password,
        username,
      },
    })
      .then(function (response) {
        const res = response.data;
        if (!res.add) {
          setError(res.results);
        } else {
          props.close();
          dispatch(User(res.results));
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

  return (
    <div className="contain-createaccount">
      <h3>Create Account</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={setemail}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={setpassword}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={conpassword}
        onChange={setconpassword}
      />
      <input
        type="text"
        name="username"
        placeholder="User Name"
        value={username}
        onChange={setusername}
      />
      {error === "" ? <></> : <Alert severity="error">{error}</Alert>}

      <div className="btn-1">
        <button onClick={diss}>I have account</button>
        <button
          className={createClick ? "aclick" : "btn-login"}
          onClick={addUser}
        >
          Register
        </button>
      </div>
      <div className="btn-g">
        <a className="btn-gg" href="http://localhost:8080/auth/google">
          <Google />
          Continue with google
        </a>
        {/* <a className="btn-gg" href="http://localhost:8080/auth/facebook">
          <Facebook />
          Continue with facebook
        </a> */}
      </div>
    </div>
  );
}
