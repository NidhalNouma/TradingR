import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

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

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("main")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
