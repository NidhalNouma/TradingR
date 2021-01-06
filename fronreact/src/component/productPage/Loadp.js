import React from "react";
import { Skeleton } from "@material-ui/lab";

function Loadp() {
  return (
    <div className="containP">
      <div className="first">
        <div>
          <Skeleton variant="rect" height={500} />
          <Skeleton
            variant="rect"
            width="60%"
            height={30}
            className="mu-5 md-5"
          />
          <Skeleton variant="rect" height={600} />
        </div>
        <Skeleton variant="rect" height={250} />
      </div>
    </div>
  );
}

export default Loadp;
