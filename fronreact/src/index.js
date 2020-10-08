import React from "react";
import ReactDOM from "react-dom";

import Index from "./notifapp";
import root from "./Reducers";

import { Provider } from "react-redux";
import { createStore } from "redux";

let store = createStore(root);
if (process.env.NODE_ENV !== "production") {
  store = createStore(
    root,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

ReactDOM.render(
  <Provider store={store}>
    {process.env.NODE_ENV !== "production" ? <Index /> : <Password />}
  </Provider>,
  document.getElementById("main")
);

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
              if (pass == "$$tradingRev$$") {
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
