import React, { useState } from "react";
import Full from "./Full";

function Imgs({ imgs }) {
  const [full, setFull] = useState(false);
  return (
    <>
      <div>
        {imgs.length > 0 && (
          <img
            className="imgs"
            alt="Img"
            src={imgs[0]}
            onClick={() => setFull(true)}
          />
        )}
        {imgs.length > 1 && (
          <img
            className="imgs"
            alt="Img"
            src={imgs[1]}
            onClick={() => setFull(true)}
          />
        )}
        {imgs.length === 3 && (
          <img
            className="imgs"
            alt="Img"
            src={imgs[2]}
            onClick={() => setFull(true)}
          />
        )}
        {imgs.length > 3 && (
          <div className="imgsb" onClick={() => setFull(true)}>
            <img alt="Img" src={imgs[2]} />
            <div>{imgs.length - 2} more</div>
          </div>
        )}
      </div>
      <Full src={imgs} open={full} setOpen={setFull} />
    </>
  );
}

export default Imgs;
