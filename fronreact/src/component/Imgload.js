import React, { useState } from "react";
import { Skeleton } from "@material-ui/lab";

function Imgload({ src, onClick }) {
  const [load, setLoad] = useState(true);

  return (
    <div className="img-load-cont">
      {load && (
        <div className="img-load">
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
      )}

      <img
        src={src}
        alt="img"
        onClick={onClick}
        onLoad={(e) => setLoad(false)}
      />
    </div>
  );
}

export default Imgload;
