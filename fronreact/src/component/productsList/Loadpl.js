import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

function Loadpl() {
  return (
    <div className="product-list">
      <Skeleton className="" variant="rect" height={130} />
      <Skeleton className="md-5" variant="text" width="80%" height={20} />
      <Skeleton className="" variant="rect" height={30} />
      <div className="flexB">
        <Skeleton variant="text" width="35%" className="mr-5" />
        <Skeleton variant="text" width="30%" />
      </div>
    </div>
  );
}

export default Loadpl;
