import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

function Loadpl() {
  return (
    <div className="product-list">
      <div className="left-card">
        <Skeleton variant="rect" className="skelton-me" />
      </div>

      <div className="right-card">
        <Skeleton variant="text" />
        {/* <Skeleton variant="rect" className="skelton-me" /> */}
        <Skeleton variant="text" width="20%" />
        <Skeleton variant="rect" height={230} />
        <Skeleton variant="text" />
      </div>
    </div>
  );
}

export default Loadpl;
