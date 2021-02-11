import React from "react";

import Inpi from "./Inpi";
import Fimg from "./Fimg";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, data, sel, setSel }) {
  const classes = useStyles();
  const style = { background: "var(--scolor)" };

  return (
    <div>
      <Dialog
        className="cardfull"
        fullScreen
        open={open}
        onClose={() => setOpen()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="var(--scolor)">
          <div className="flexB">
            <div></div>

            <div className="sdetails m0 flexA">
              <span
                style={sel === 0 ? style : undefined}
                onClick={() => setSel(0)}
              >
                Screenshots
              </span>
              <span
                style={sel === 1 ? style : undefined}
                onClick={() => setSel(1)}
              >
                Inputs
              </span>
              <span
                style={sel === 2 ? style : undefined}
                onClick={() => setSel(2)}
              >
                How to use
              </span>
              <span
                style={sel === 3 ? style : undefined}
                onClick={() => setSel(3)}
              >
                What's new
              </span>
            </div>

            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </AppBar>
        <div>
          {sel === 3 ? (
            <Inpi data={data.whatsNew} />
          ) : sel === 2 ? (
            <Inpi data={data.howtouse} />
          ) : sel === 1 ? (
            <Inpi data={data.inputs} />
          ) : (
            <Fimg src={data.results} />
          )}
        </div>
      </Dialog>
    </div>
  );
}
