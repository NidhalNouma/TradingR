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
    <Index />
  </Provider>,
  document.getElementById("main")
);
