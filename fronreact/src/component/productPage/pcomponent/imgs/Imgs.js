import React, { useState } from "react";
import Full from "./Full";

function Imgs({ imgs, set, upl }) {
  const [full, setFull] = useState(false);
  return (
    <>
      {upl && (
        <div style={{ display: "flex", overflowX: "scroll" }}>
          {imgs.length > 0 &&
            imgs.map((i, ii) => (
              <div style={{ position: "relative" }}>
                <img
                  key={ii}
                  className="imgs mr-5"
                  alt="Img"
                  src={i}
                  onClick={() => setFull(true)}
                />
                <button
                  style={{
                    position: "absolute",
                    right: "5px",
                    bottom: "5px",
                    backgroundColor: "var(--scolor)",
                    borderRadius: "50%",
                  }}
                  className="buttonX flexC"
                  onClick={() => set(imgs.filter((i1, ii1) => ii1 !== ii))}
                >
                  X
                </button>
              </div>
            ))}
        </div>
      )}{" "}
      {!upl && (
        <div className="">
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
            <div className="imgs imgsb1" onClick={() => setFull(true)}>
              <img alt="Img" src={imgs[2]} className="imgs" />
              <div className="flexC">{imgs.length - 2} more</div>
            </div>
          )}
        </div>
      )}
      <Full src={imgs} open={full} setOpen={setFull} />
    </>
  );
}

export default Imgs;
