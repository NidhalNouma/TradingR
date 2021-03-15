import React from "react";
import { ResetPassword } from "../Hooks/User";
import { Alert } from "@material-ui/lab";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

function ForgetPassword({ back }) {
  const {
    email,
    setEmail,
    error,
    click,
    done,
    sendMailToReset,
  } = ResetPassword();

  return (
    <div>
      <h3 className="h31">Forget Password</h3>
      <input
        className={error ? "inputerror" : ""}
        type="email"
        name="email"
        placeholder="Email"
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
        <button className="buttonT flexC scaleH" onClick={back}>
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
  );
}

export default ForgetPassword;
