import React from "react";
import { Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function SetNotif({ am, setam, msg }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: msg ? msg.place : "left",
      }}
      open={am}
      autoHideDuration={msg ? msg.duration : 0}
      onClose={() => setam(false)}
    >
      <Alert
        onClose={() => setam(false)}
        severity="success"
        style={{
          backgroundColor: "var(--pcolor)",
          color: "var(--scolor)",
          borderRadius: "10px",
        }}
      >
        {msg && msg.msg}
      </Alert>
    </Snackbar>
  );
}

export default SetNotif;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
