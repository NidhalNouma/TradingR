import React from "react";
import ReactDOM from "react-dom";
import { Socket, SocketC } from "./component/Hooks/Socket";

import Index from "./notifapp";

function Password() {
  const [corr, setCorr] = React.useState(false);
  const [pass, setPass] = React.useState("");
  return (
    <>
      {!corr ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h1 style={{ margin: ".4rem 0" }}>Enter Password</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ width: "200px" }}
          />
          <button
            style={{ margin: "1rem auto", padding: ".4rem 1rem" }}
            onClick={() => {
              if (pass === "$$tradingRev$$") {
                setCorr(true);
              } else {
                alert("Wrong Password");
              }
            }}
          >
            Enter
          </button>
        </div>
      ) : (
        <Index />
      )}
    </>
  );
}

function Main() {
  const { socket, setSocket, onP, onPP } = Socket();
  return (
    <SocketC.Provider value={{ socket, setSocket, onP, onPP }}>
      <Index />
    </SocketC.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById("main"));
