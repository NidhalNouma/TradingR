import React from "react";
import { Link } from "react-router-dom";
import Parse from "html-react-parser";

import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Show from "../show";
import Signin from "../signIn";
import Trynow from "../productPage/pcomponent/Trynow";

export default function Productlist({ p }) {
  const [trynow, setTrynow] = React.useState(false);
  const sign = Show();

  return (
    <>
      <div className="product-list img-scale">
        <Link to={{ pathname: "/product/" + p._id, product: p }} className="ah">
          <div className="left-card">
            <div className="pr-img-info">
              <img src={p.product.img} alt="" />
              <div className="flexB mu-5 info">
                <div className="int">
                  <span className="flexC svg22">
                    <span className="span mr-125">
                      {p.downloads ? p.downloads.length : 0}
                    </span>
                    <GetAppRoundedIcon />
                  </span>
                </div>
                <div>
                  <span className="span1">MT4</span>
                  <span className="span1 ml-5">MT5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right-card mu-5">
            <Link
              className="ah"
              to={{ pathname: "/product/" + p._id, product: p }}
            >
              <h5 className="h5 m0 md-5">{p.product.title}</h5>
            </Link>

            <p className="pgl2 parse1">{Parse(p.product.description)}</p>
          </div>
        </Link>
      </div>

      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {trynow ? <Trynow trynow={trynow} setTrynow={setTrynow} /> : <></>}
    </>
  );
}
