import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { Socket, SocketC } from "./component/Hooks/Socket";

import Index from "./notifapp";

function Main() {
  const { socket, onP, onPP } = Socket();
  return (
    <SocketC.Provider value={{ socket, onP, onPP }}>
      <Index />
    </SocketC.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById("main"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
