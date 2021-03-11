import React from "react";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";

function Fimg({ src }) {
  const [i, setI] = React.useState(0);
  return (
    <div className="cimgFC">
      <div className="cimgF pu2">
        <div
          className="divbtnC l"
          onClick={() => setI(i === 0 ? src.length - 1 : i - 1)}
        >
          <button
            className="buttonC flexC"
            onClick={() => setI(i === 0 ? src.length - 1 : i - 1)}
          >
            <ChevronLeftRoundedIcon />
          </button>
        </div>
        <div className="imgW">
          <img className="imgF" src={src[i]} alt="img" />
        </div>
        <div
          className="divbtnC r"
          onClick={() => setI(i === src.length - 1 ? 0 : i + 1)}
        >
          <button
            className="buttonC flexC"
            onClick={() => setI(i === src.length - 1 ? 0 : i + 1)}
          >
            <ChevronRightRoundedIcon />
          </button>
        </div>
      </div>
      <div className="flexC cimgDC">
        {/* {src.map((ij, ii) => {
          return (
            <img className={ii === i ? "" : "imgFilter"} src={ij} alt="pImg" />
          );
        })} */}
        <div className="md1">
          <span className="span bold">{i + 1}</span>
          <span className="span">/{src.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Fimg;
