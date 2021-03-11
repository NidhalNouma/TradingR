import React, { useEffect } from "react";
import Fimg from "./Fimg";

function Fullsc({ data, close }) {
  useEffect(() => {
    const body = document.getElementsByTagName("BODY")[0];
    body.style.overflow = "hidden";

    return () => (body.style.overflow = "scroll");
  }, []);

  return (
    <div className="fullsc">
      <div className="fullhead flexB">
        <div></div>
        <button className="buttonC" onClick={close}>
          <span>X</span>
        </button>
      </div>
      <Fimg src={data.results} />
    </div>
  );
}

export default Fullsc;
