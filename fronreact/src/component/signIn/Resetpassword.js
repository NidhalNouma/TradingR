import React from "react";
import { ResetPassword } from "../Hooks/User";
import { Alert } from "@material-ui/lab";
import { Dialog } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

function Resetpassword({ show, close }) {
  const {
    email,
    setEmail,
    error,
    click,
    done,
    sendMailToReset,
  } = ResetPassword();
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
            <input
              className={error ? "inputerror" : ""}
              type="password"
              name="password"
              placeholder="New Password"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <inpuT
              className={error ? "inputerror" : ""}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {done && (
              <Alert severity="success">
                Please check your email to Reset your password.
              </Alert>
            )}
            {error === "" ? <></> : <Alert severity="error">{error}</Alert>}
            <div className="btn-1 flexB">
              <button className="buttonT flexC scaleH">
                <ArrowLeftIcon />
                <span>Back</span>
              </button>
              <button
                className={click ? "aclick buttonP flexA" : "buttonP flexA"}
                onClick={sendMailToReset}
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
