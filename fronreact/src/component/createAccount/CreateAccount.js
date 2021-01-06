import React, { useState, useEffect, useContext } from "react";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import Google from "../../asset/images/Google";
import { UserC } from "../Hooks/User";
// import Facebook from "../../asset/images/Facebook";

export default function CreateAccount(props) {
  const user = useContext(UserC);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [createClick, setCreateClick] = useState(false);

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
        username: username,
      },
    })
      .then(function (response) {
        const res = response.data;
        if (!res.add) {
          setError(res.results);
        } else {
          props.setActiv(true);
          user.setUser(res.results);
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
    <div className="contain-sign">
      <h3 className="h31">Create Account</h3>
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
        <button className="buttonS flexA" onClick={diss}>
          I have account
        </button>
        <button
          className={createClick ? "aclick" : "buttonP flexA"}
          onClick={addUser}
        >
          Register
        </button>
      </div>
      <div className="btn-g">
        <a className="btn-gg a flex" href="/auth/google">
          <Google />
          <span className="ml-5">Continue with google</span>
        </a>
        {/* <a className="btn-gg" href="http://localhost:8080/auth/facebook">
          <Facebook />
          Continue with facebook
        </a> */}
      </div>
    </div>
  );
}
