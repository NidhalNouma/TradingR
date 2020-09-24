import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

function Dialogalert({ open, setOpen, agree }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogalert"
      >
        <h5>Unsubscribe</h5>
        <DialogContent>
          <p>Are you sure you want to unsubscribe</p>
        </DialogContent>
        <DialogActions>
          <span onClick={setOpen} color="primary">
            Cancel
          </span>
          <span onClick={agree} color="primary" autoFocus>
            Accept
          </span>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dialogalert;
