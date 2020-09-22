import React, { useState } from "react";

import Show from "../../show";
import Signin from "../../signIn";
import Trynow from "./Trynow";
import Subscriber from "./spcom/Subscribe";

function MyApp({ product, version, setSel, id, classn = "cost" }) {
  const sign = Show();
  const [trynow, setTrynow] = React.useState(false);
  const [reff, setReff] = useState(0);
  return (
    <>
      <div className={classn}>
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
        <div className="exist">
          <span>MT4</span>
          <span>MT5</span>
        </div>
        <div className="div">
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

export default MyApp;
