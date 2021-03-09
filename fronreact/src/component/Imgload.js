import React, { useState } from "react";

function Imgload({ src, onClick }) {
  const [load, setLoad] = useState(true);

  return (
    <div className="img-load-cont">
      {load && <div className="img-load"></div>}
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
