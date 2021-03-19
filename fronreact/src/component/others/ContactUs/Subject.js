import React from "react";
import Paymentimg from "./Imgs/Paymentimg";
import Ideaimg from "./Imgs/Ideaimg";
import Instalationimg from "./Imgs/Instalationimg";
import Otherimg from "./Imgs/Otherimg";

function Subject({ t, i, set, s }) {
  return (
    <div
      className="subject flexC"
      style={{ backgroundColor: s === i ? "var(--tcolor)" : "" }}
      onClick={() => set(i)}
    >
      <Img i={i} />
      <h5 className="h5 mu-5">{t}</h5>
    </div>
  );
}

export default Subject;

const Img = ({ i }) => {
  return (
    <>
      {i === 0 ? (
        <Ideaimg />
      ) : i === 1 ? (
        <Paymentimg />
      ) : i === 2 ? (
        <Instalationimg />
      ) : i === 3 ? (
        <Otherimg />
      ) : (
        <></>
      )}
    </>
  );
};
