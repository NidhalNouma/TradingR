import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { Socket, SocketC } from "./component/Hooks/Socket";

import Index from "./notifapp";

function Main() {
  console.log("%cWelcome", "color: green; font-weight:bold; font-size:10rem");
  // const [ok, setOk] = React.useState(
  //   process.env.NODE_ENV === "development" ? true : false
  // );
  const { socket, onP, onPP, onNot } = Socket();
  return (
    <>
      {/* {ok ? ( */}
      <SocketC.Provider value={{ socket, onP, onPP, onNot }}>
        <Index />
      </SocketC.Provider>
      {/* ) : (
        <Pass set={() => setOk(true)} />
      )} */}
    </>
  );
}

// const Pass = ({ set }) => {
//   return (
//     <div className="container">
//       <input
//         type="password"
//         onChange={(e) => {
//           if (e.target.value === "$$tr$$") set();
//         }}
//       />
//     </div>
//   );
// };

ReactDOM.render(<Main />, document.getElementById("main"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
