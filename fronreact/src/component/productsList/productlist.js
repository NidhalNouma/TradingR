import React from "react";
import { Link } from "react-router-dom";
import Parse from "html-react-parser";

import Show from "../show";
import Signin from "../signIn";
import Trynow from "../productPage/pcomponent/Trynow";

export default function Productlist({ p }) {
  const [trynow, setTrynow] = React.useState(false);
  const sign = Show();

  return (
    <>
      <div className="product-list">
        <div className="left-card">
          <Link to={{ pathname: "/product/" + p._id, product: p }}>
            <img src={p.product.img} alt="" />
          </Link>
        </div>
        <div className="right-card">
          <Link
            className="ah"
            to={{ pathname: "/product/" + p._id, product: p }}
          >
            <h5 className="h5 m0 md-5">{p.product.title}</h5>
          </Link>

          <p className="pgl2 parse1">{Parse(p.product.description)}</p>
          <>
            <div className="flexB">
              <span className="span2 bold">
                {p.subscribers && p.subscribers.length} Subscribers
              </span>
              <div>
                <span className="span1 mr-5">MT4</span>
                <span className="span1">MT5</span>
              </div>
            </div>
          </>
          {/* <div className="flexB mu1">
            <div>
              <h4>{p.subscribers && p.subscribers.length} Subscribers</h4>
              <h4>{p.downloads && p.downloads.length} Downloads</h4>
            </div>
            <div>
              <Link
                className="a"
                to={{ pathname: "/product/" + p._id, product: p }}
              >
                Read More
              </Link>
              <button onClick={() => setTrynow(true)} className="abtnP ml1">
                Try Now
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {trynow ? <Trynow trynow={trynow} setTrynow={setTrynow} /> : <></>}
    </>
  );
}
