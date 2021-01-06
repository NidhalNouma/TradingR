import React from "react";
import Dialog from "@material-ui/core/Dialog";

function Dialogalert({ open, setOpen, agree }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="pu1 pl2 pr2 pd1">
          <h5 className="h31">Unsubscribe</h5>
          <p className="p bold">Are you sure you want to unsubscribe</p>
          <div className="flexB mu2">
            <span onClick={setOpen} className="aspan bold">
              Cancel
            </span>
            <span onClick={agree} className="aspanX bold" autoFocus>
              Accept
            </span>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Dialogalert;
