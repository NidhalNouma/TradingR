import React, { useState } from "react";
import Inp from "./Inp";
import Imgsp from "./Imgsp";

import IconButton from "@material-ui/core/IconButton";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import Show from "../../../show";
import FullScreenDialog from "./fulld/fullscreen";

function Index({ data }) {
  const [sel, setSel] = useState(0);
  const style = { background: "var(--scolor)" };
  const show = Show();

  return (
    <>
      <FullScreenDialog
        open={show.show}
        setOpen={show.cshow}
        data={data}
        sel={sel}
        setSel={setSel}
      />
      <div className="sdetails flexA">
        {data.results && (
          <span style={sel === 0 ? style : undefined} onClick={() => setSel(0)}>
            Screenshots
          </span>
        )}
        <span style={sel === 1 ? style : undefined} onClick={() => setSel(1)}>
          Inputs
        </span>
        <span style={sel === 2 ? style : undefined} onClick={() => setSel(2)}>
          How to use
        </span>
        <span style={sel === 3 ? style : undefined} onClick={() => setSel(3)}>
          What's new
        </span>
      </div>
      <div id="de">
        <div className="chart parse">
          <div className="full">
            <IconButton edge="end" color="inherit" onClick={() => show.sshow()}>
              <FullscreenRoundedIcon />
            </IconButton>
          </div>
          {sel === 3 ? (
            data.whatsNew && <Inp data={data.whatsNew} />
          ) : sel === 2 ? (
            data.howtouse && <Inp data={data.howtouse} />
          ) : sel === 1 ? (
            data.inputs && <Inp data={data.inputs} />
          ) : (
            <Imgsp data={data.results} show={() => show.sshow()} />
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
