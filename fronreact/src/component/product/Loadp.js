import React from "react";
import { Skeleton } from "@material-ui/lab";

function Loadp() {
  return (
    <div className="containP">
      <div className="first">
        <div>
          <Skeleton variant="rect" height={500} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rect" height={100} />
        </div>
        <Skeleton variant="rect" height={240} />
      </div>
    </div>
  );
}

export default Loadp;
