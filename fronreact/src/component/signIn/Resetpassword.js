import React from "react";
import { ChangePassword } from "../Hooks/User";
import { Alert } from "@material-ui/lab";
import { Dialog } from "@material-ui/core";

function Resetpassword({ show, close, email, setShow }) {
  const {
    password,
    setPassword,
    confirmPassword,
    setCPassword,
    error,
    click,
    submit,
  } = ChangePassword(email);
  return (
    <Dialog
      open={show}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="bg-sign">
        <div className="contain-sign">
          <button className="buttonC" onClick={close}>
            X
          </button>
          <div>
            <h3 className="h31">Reset Password</h3>
            <p className="span border p-5 mu1 md-5">{email}</p>
            <input
              className={error ? "inputerror" : ""}
              type="password"
              name="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <inpuT
              className={error ? "inputerror" : ""}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setCPassword(e.target.value)}
              value={confirmPassword}
            />
            {error === "" ? <></> : <Alert severity="error">{error}</Alert>}
            <div className="btn-1 flexC">
              <button
                className={click ? "aclick buttonP flexA" : "buttonP flexA"}
                onClick={() => submit(setShow, close)}
              >
                {click ? "Reset Password ..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default Resetpassword;
