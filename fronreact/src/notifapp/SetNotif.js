import React from "react";
import { Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function SetNotif({ am, setam }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={am}
      autoHideDuration={3000}
      onClose={() => setam(false)}
    >
      <Alert
        onClose={() => setam(false)}
        severity="success"
        style={{
          backgroundColor: "var(--scolor)",
          color: "var(--pcolor)",
          borderRadius: "7px",
        }}
      >
        This is a success message!
      </Alert>
    </Snackbar>
  );
}

export default SetNotif;

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      action={
        <Button color="inherit" size="small" onClick={props.onClose}>
          UNDO
        </Button>
      }
    />
  );
}
