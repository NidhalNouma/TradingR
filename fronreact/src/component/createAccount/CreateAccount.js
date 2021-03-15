import React, { useContext } from "react";
import { AddNewUser } from "../Hooks/User";
import { UserC } from "../Hooks/User";
import { Alert } from "@material-ui/lab";

import Google from "../../asset/images/Google";
// import Facebook from "../../asset/images/Facebook";

export default function CreateAccount({ setActiv, dissmis }) {
  const { setUser: setFUser } = useContext(UserC);
  const { user, setUser, error, add, createClick } = AddNewUser();

  return (
    <div>
      <h3 className="h31">Create Account</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      {error === "" ? <></> : <Alert severity="error">{error}</Alert>}

      <div className="btn-1 flexB">
        <button className="buttonS flexA" onClick={(e) => dissmis()}>
          I have account
        </button>
        <button
          className={createClick ? "aclick buttonP" : "buttonP flexA"}
          onClick={(e) => {
            e.preventDefault();
            add(setFUser, setActiv);
          }}
        >
          {createClick ? "Register ..." : "Register"}
        </button>
      </div>
      <div className="btn-g">
        <a className="btn-gg a" href="/auth/google">
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
