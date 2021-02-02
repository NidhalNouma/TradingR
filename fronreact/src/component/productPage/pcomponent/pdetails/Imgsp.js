import React from "react";

function Imgsp({ data, show }) {
  return (
    <div className="pd-cimgs flex">
      <div className="pd-imgs">
        {data.map((i, ii) => (
          <img key={ii} src={i} alt="img" onClick={show} />
        ))}
      </div>
    </div>
  );
}

export default Imgsp;
