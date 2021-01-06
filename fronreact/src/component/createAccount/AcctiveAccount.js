import React from "react";
import { Dialog } from "@material-ui/core";

function AcctiveAccount({ activ, close, setActiv }) {
  return (
    <Dialog
      open={activ}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="activeaccount p2 pd1 pu1">
        <h4 className="h4 bold">Active your account</h4>
        <p className="p bold">
          We have sent an email for activation please checkout your mail
        </p>
        <div className="flexB mu2">
          <button
            className="buttonT tHover"
            onClick={() => {
              close();
              setActiv(false);
            }}
          >
            Skip for now
          </button>
          <button className="buttonT tHover">Send again</button>
        </div>
      </div>
    </Dialog>
  );
}

export default AcctiveAccount;
