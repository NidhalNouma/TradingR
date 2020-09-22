import React from "react";
import { Link } from "react-router-dom";

import Show from "../show";
import Signin from "../signIn";
import Trynow from "./pcomponent/Trynow";

export default function Productlist({ product, id, subscribers, downloads }) {
  const [trynow, setTrynow] = React.useState(false);
  const sign = Show();

  return (
    <>
      <div className="product-list">
        <div className="left-card">
          <img src={product.img} alt="" />
        </div>
        <div className="right-card">
          <Link to={"/product/" + id}>
            <h2>{product.title}</h2>
          </Link>

          <div className="media-left-card">
            <img src={product.img} alt="" />
          </div>
          <>
            <div>
              <span>MT4</span>
              <span>MT5</span>
            </div>
          </>
          <p>{product.description}</p>
          <div className="btn-card">
            <div>
              <h4>{subscribers && subscribers.length} Subscribers</h4>
              <h4>{downloads && downloads.length} Downloads</h4>
            </div>
            <div>
              <Link to={"/product/" + id}>Read More</Link>
              <a onClick={() => setTrynow(true)} className="buy-btn">
                Try Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {trynow ? <Trynow trynow={trynow} setTrynow={setTrynow} /> : <></>}
    </>
  );
}
