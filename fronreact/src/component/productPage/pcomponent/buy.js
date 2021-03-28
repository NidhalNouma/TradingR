import React, { useContext } from "react";

import Trynow from "./Trynow";
import Subscriber from "./spcom/Subscribe";

import { ProductC, changeV } from "../../Hooks/Products";

function MyApp({ classn = "cost" }) {
  const [trynow, setTrynow] = React.useState(false);
  const { p, setProduct } = useContext(ProductC);

  return (
    <>
      <div className={classn}>
        <button
          onClick={() => {
            setTrynow(true);
          }}
          className="buttonP"
        >
          Try Now
        </button>
        <Subscriber />
        <span className="span mu1">{p.subscribers.length} Subscribers</span>
        <span className="span md1">{p.downloadsNumber} Downloads</span>
        <div className="mu-5">
          <span className="span1">MT4</span>
          <span className="span1 ml-5">MT5</span>
        </div>
        <div className="mu1">
          <span className="span mr-5">Version</span>
          <select onChange={(e) => setProduct(changeV(p, e.target.value))}>
            {p.ps
              .sort((a, b) => b - a)
              .map((i, ii) => (
                <option
                  key={ii}
                  value={i._id}
                  selected={i.version === p.product.version ? "selected" : ""}
                >
                  {i.version.toFixed(2)}
                </option>
              ))}
          </select>
        </div>
      </div>
      {trynow ? (
        <Trynow trynow={trynow} file={p.product.files} setTrynow={setTrynow} />
      ) : (
        <></>
      )}
    </>
  );
}

export default MyApp;
