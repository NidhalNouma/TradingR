import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
// import AppBar from "@material-ui/core/AppBar";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Full({ src, open, setOpen }) {
  // console.log(src);
  const [i, setI] = useState(0);
  return (
    <div>
      <Dialog
        className="cardfull"
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <div className="fullhead flexB">
          <div></div>
          <button className="buttonC" onClick={() => setOpen(false)}>
            <span>X</span>
          </button>
        </div>
        {/* <AppBar color="var(--scolor)">
          <div className="flexB">
            <div></div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </AppBar> */}
        <div className="imgFC">
          <div className="cimgF pu2">
            <div
              className="divbtnC l"
              onClick={() => setI(i === 0 ? src.length - 1 : i - 1)}
            >
              <button
                className="buttonC flexC"
                onClick={() => setI(i === 0 ? src.length - 1 : i - 1)}
              >
                <ChevronLeftRoundedIcon />
              </button>
            </div>
            <div className="imgW">
              <img className="imgF" src={src[i]} alt="img" />
            </div>

            <div
              className="divbtnC r"
              onClick={() => setI(i === src.length - 1 ? 0 : i + 1)}
            >
              <button
                className="buttonC flexC"
                onClick={() => setI(i === src.length - 1 ? 0 : i + 1)}
              >
                <ChevronRightRoundedIcon />
              </button>
            </div>
          </div>
          <div className="flexC cimgDC">
            {src.map((ij, ii) => {
              return (
                <img
                  className={ii === i ? "" : "imgFilter"}
                  src={ij}
                  alt="pImg"
                />
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Full;
