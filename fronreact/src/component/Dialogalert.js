import React from "react";
import Dialog from "@material-ui/core/Dialog";

function Dialogalert({ open, setOpen, agree, title, body }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="pu1 pl2 pr2 pd1">
          <h5 className="h31">{title}</h5>
          <p className="p bold">{body}</p>
          <div className="flexB mu2">
            <span onClick={agree} className="aspanX bold" autoFocus>
              Accept
            </span>
            <span onClick={setOpen} className="aspan bold">
              Cancel
            </span>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Dialogalert;
