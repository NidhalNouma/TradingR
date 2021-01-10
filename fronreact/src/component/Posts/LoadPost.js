import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

function LoadPost() {
  return (
    <div className="md1 border p-5">
      <Skeleton variant="rect" width="100%" height={40} className="md-5" />
      <Skeleton variant="rect" width="100%" height={310} className="" />
      <Skeleton variant="rect" width="100%" height={50} className="mu1" />
    </div>
  );
}

export default LoadPost;
