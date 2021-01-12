import React from "react";
import { Skeleton } from "@material-ui/lab";

function Loadp({ l = 100 }) {
  const nopr = [1, 2, 3, 4, 5, 6, 7, 8];
  return nopr.map((i) => (
    <div key={i} className="md1">
      <Skeleton variant="rect" height={l} />
    </div>
  ));
}

export default Loadp;
