import React, { useContext } from "react";
import { Dialog } from "@material-ui/core";
import Trycomp from "./Trycomp";
import { UserC } from "../../Hooks/User";
import { checkMember } from "../../pricing/price";

function Trynow({ trynow, setTrynow, file }) {
  const { user } = useContext(UserC);
  let val = 0;
  if (user) {
    val = checkMember(user.sub);
  }

  return (
    <div>
      <Dialog
        className="dial-cost"
        open={trynow}
        onClose={() => setTrynow(false)}
      >
        <div className="relative">
          <button className="buttonC absolute" onClick={() => setTrynow(false)}>
            X
          </button>
          {!file ? (
            <h1 className="colorP p2">No Product exist!</h1>
          ) : (
            <>
              {file.MT4 && (
                <div className="p-5">
                  <h4 className="h5 ml1 mu1">MT4 Versions</h4>
                  <div className="flexB">
                    {file.MT4.test && <Trycomp d={file.MT4.test} t={true} />}
                    {file.MT4.product && (
                      <Trycomp
                        not={val >= 1 ? false : true}
                        d={file.MT4.product}
                      />
                    )}
                  </div>
                </div>
              )}
              {file.MT5 && (
                <div className="p-5">
                  <h4 className="h5 ml1 mu1">MT5 Versions</h4>
                  <div className="flexB">
                    {file.MT5.test && <Trycomp d={file.MT5.test} t={true} />}
                    {file.MT5.product && (
                      <Trycomp
                        not={val >= 1 ? false : true}
                        d={file.MT5.product}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default Trynow;
