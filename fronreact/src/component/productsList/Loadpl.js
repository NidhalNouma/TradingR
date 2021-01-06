import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

function Loadpl() {
  return (
    <div className="product-list">
      <div className="left-card">
        <Skeleton variant="rect" className="skel-img1" />
      </div>

      <div className="right-card">
        <Skeleton variant="rect" width="50%" height={30} />
        <div className="flex">
          <Skeleton variant="text" width="10%" className="mr-5" />
          <Skeleton variant="text" width="10%" />
        </div>
        <Skeleton variant="rect" height={200} />
        <div className="flexB mu1">
          <Skeleton variant="rect" width="30%" height={40} />
          <Skeleton variant="rect" width="40%" height={40} />
        </div>
      </div>
    </div>
  );
}

export default Loadpl;
