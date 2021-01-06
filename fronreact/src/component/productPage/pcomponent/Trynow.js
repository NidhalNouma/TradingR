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
        <div className="trynow">
          <Trycomp />
          <Trycomp />
          <Trycomp />
        </div>
      </Dialog>
    </div>
  );
}

export default Trynow;
