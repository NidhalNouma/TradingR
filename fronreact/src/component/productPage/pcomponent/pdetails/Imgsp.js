import React from "react";

function Imgsp({ data, show }) {
  return (
    <div className="pd-cimgs flex">
      <div className="pd-imgs">
        {data.map((i, ii) => {
          if (ii < 5 || data.length <= 6)
            return <img key={ii} src={i} alt="img" onClick={show} />;
          else
            return (
              <div className="imgsb" style={{ width: "100%", height: "100%" }}>
                <img alt="Img" src={data[5]} onClick={show} />
                <div>{data.length - 5} more</div>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Imgsp;
