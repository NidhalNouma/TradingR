import React from "react";
import { Dialog } from "@material-ui/core";

function AcctiveAccount({ activ, close, setActiv }) {
  return (
    <Dialog
      open={activ}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="activeaccount">
        <h3>Active your account</h3>
        <p>we have sent an email for acctivation please checkout your mail</p>
        <div>
          <span
            onClick={() => {
              close();
              setActiv(false);
            }}
          >
            Skip for now
          </span>
          <span>Send again</span>
        </div>
      </div>
    </Dialog>
  );
}

export default AcctiveAccount;
