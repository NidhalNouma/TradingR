import React from "react";
import { Dialog } from "@material-ui/core";
import Trycomp from "./Trycomp";

function Trynow({ trynow, setTrynow }) {
  return (
    <div>
      <Dialog
        className="dial-cost"
        open={trynow}
        onClose={() => setTrynow(false)}
      >
        <div>
          <h4 className="h5 ml1">MT4 Versions</h4>
          <div className="flexB">
            <Trycomp />
            <Trycomp not={true} />
            <Trycomp not={true} />
          </div>
        </div>
        <div>
          <h4 className="h5 ml1">MT5 Versions</h4>
          <div className="flexB">
            <Trycomp />
            <Trycomp not={true} />
            <Trycomp not={true} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Trynow;
