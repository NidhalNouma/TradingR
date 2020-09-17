import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";

import Show from "../../show";
import Signin from "../../signIn";
import Trynow from "./Trynow";
import Subscriber from "./spcom/Subscribe";

function MyApp({ price, sch, product, version, sel, setSel, id }) {
  const sign = Show();
  // const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [trynow, setTrynow] = React.useState(false);
  const [reff, setReff] = useState(0);
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="cost">
        <a
          onClick={() => {
            setTrynow(true);
          }}
          className="buy-btn"
        >
          Try Now
        </a>
        <Subscriber
          setReff={() => setReff(reff + 1)}
          product={product}
          id={id}
          sign={() => sign.sshow()}
        />
        <span>{product.subscribers.length} Subscriber</span>
        <span>{product.numberOfDownload.length} Downloads</span>
        <div>
          <span>
            <div>Version</div>
            <select onChange={(e) => setSel(e.target.value)}>
              {version &&
                version
                  .sort((a, b) => b - a)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i.toFixed(1)}
                    </option>
                  ))}
            </select>
          </span>
        </div>
      </div>

      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {trynow ? (
        <Trynow trynow={trynow} price={product.price} setTrynow={setTrynow} />
      ) : (
        <></>
      )}
    </>
  );
}

//function Buy({ price, sch, product, version, sel, setSel, id }) {
//   return (
//     <SnackbarProvider maxSnack={4}>
//       <MyApp
//         price={price}
//         sch={sch}
//         product={product}
//         version={version}
//         sel={sel}
//         setSel={setSel}
//         id={id}
//       />
//     </SnackbarProvider>
//   );
// }
export default MyApp;
