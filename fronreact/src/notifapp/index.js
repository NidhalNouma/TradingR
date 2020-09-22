import React from "react";

import App from "../app";
import SetNotif from "./SetNotif";

function Notif() {
  const [am, setam] = React.useState(false);
  return (
    <>
      <SetNotif am={am} setam={setam} />
      {/* <button
        onClick={() => {
          console.log("click", am);
          setam(!am);
        }}
        style={{ position: "absolute" }}
      >
        click me
      </button> */}
      <App />
    </>
  );
}

export default Notif;
