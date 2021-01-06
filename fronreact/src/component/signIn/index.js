import React, { useState, useContext } from "react";
import axios from "axios";
import { Dialog } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Google from "../../asset/images/Google";
// import Facebook from "../../asset/images/Facebook";
import { UserC } from "../Hooks/User";

import CreateAccount from "../createAccount";

export default function Signin(props) {
  const user = useContext(UserC);
  const [create, setcreate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginclick, setLoginclick] = useState(false);
  const [error, setError] = useState("");

  const close = (e) => {
    if (e.target.getAttribute("class") !== "bg-sign") return;
    props.close();
  };

  const closea = () => {
    props.close();
  };

  const showcreate = () => {
    setError("");
    setcreate(true);
  };

  const diss = () => {
    setcreate(false);
  };

  const setemail = (e) => {
    setEmail(e.target.value);
  };

  const setpassword = (e) => {
    setPassword(e.target.value);
  };

  const getUser = () => {
    setError("");

    if (email && password) {
      setLoginclick(true);
      axios({
        method: "post",
        url: "/api/user/find",
        data: {
          email,
          password,
        },
      })
        .then(function (response) {
          if (!response.data.findUser) {
            setError("Email or Password Incorrect!");
          } else {
            const res = response.data.result;
            props.close();
            user.setUser(res);
          }
        })
        .catch(function (error) {
          console.log(error);
          setError("Network Error! Please try again later");
        })
        .finally(function () {
          setLoginclick(false);
        });
    } else {
      setError("Email and Password Required!");
    }
  };

  return (
    <Dialog
      open={props.show}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="bg-sign" onClick={close}>
        {create ? (
          <CreateAccount dissmis={diss} close={closea} />
        ) : (
          <div className="contain-sign">
            <h3 className="h31">Sign In</h3>
            <input
              className={error ? "inputerror" : ""}
              type="email"
              name="email"
              placeholder="Email"
              onChange={setemail}
              value={email}
            />

            <input
              className={error ? "inputerror" : ""}
              type="password"
              name="password"
              placeholder="Password"
              onChange={setpassword}
              value={password}
            />
            {error === "" ? <></> : <Alert severity="error">{error}</Alert>}
            <div className="btn-1">
              <button className="buttonS flexA" onClick={showcreate}>
                Create Account
              </button>
              <button
                className={loginclick ? "aclick" : "buttonP flexA"}
                onClick={getUser}
              >
                Login
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
        )}
      </div>
    </Dialog>
  );
}
