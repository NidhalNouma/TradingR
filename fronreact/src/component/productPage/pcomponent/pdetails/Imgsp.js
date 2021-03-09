import React from "react";
import Imgload from "../../../Imgload";

function Imgsp({ data, show }) {
  return (
    <div className="pd-cimgs flex">
      <div className="pd-imgs pd-cimgs">
        {data.map((i, ii) => {
          if (ii < 5 || data.length <= 6)
            return (
              <>
                <Imgload key={ii} src={i} onClick={show} />
              </>
            );
          else if (ii === 5)
            return (
              <div className="imgsb" style={{ width: "100%", height: "100%" }}>
                <Imgload src={data[5]} onClick={show} />
                {/* <img alt="Img" src={data[5]} onClick={show} /> */}
                <div className="num">{data.length - 5} more</div>
              </div>
            );
          else return null;
        })}
      </div>
    </div>
  );
}

export default Imgsp;
