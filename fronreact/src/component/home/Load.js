import React from "react";
import { Skeleton } from "@material-ui/lab";

function Load() {
  return (
    <div className="griditem">
      <Skeleton className="skel-img" variant="rect" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rect" height={30} />
      <div className="flexB">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="30%" />
      </div>
    </div>
  );
}

export default Load;
