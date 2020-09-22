import React from "react";
import { Skeleton } from "@material-ui/lab";

function Load() {
  return (
    <div className="griditem">
      <Skeleton className="skel-img" variant="rect" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rect" height={50} />
      <Skeleton variant="text" width="20%" />
    </div>
  );
}

export default Load;
