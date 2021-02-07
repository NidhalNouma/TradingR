import React, { useContext } from "react";
import { Dialog } from "@material-ui/core";
import Trycomp from "./Trycomp";
import { UserC } from "../../Hooks/User";
import { checkMember } from "../../pricing/price";

function Trynow({ trynow, setTrynow }) {
  const { user } = useContext(UserC);
  console.log(user);
  let val = 0;
  if (user) {
    val = checkMember(user.sub);
    console.log(val);
  }

  return (
    <div>
      <Dialog
        className="dial-cost"
        open={trynow}
        onClose={() => setTrynow(false)}
      >
        <div className="p-5">
          <h4 className="h5 ml1 mu1">MT4 Versions</h4>
          <div className="flexB">
            <Trycomp />
            <Trycomp not={val >= 1 ? false : true} />
            <Trycomp not={val >= 2 ? false : true} />
          </div>
        </div>
        <div>
          <h4 className="h5 ml1">MT5 Versions</h4>
          <div className="flexB">
            <Trycomp />
            <Trycomp not={val >= 1 ? false : true} />
            <Trycomp not={val >= 2 ? false : true} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Trynow;
