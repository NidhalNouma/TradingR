import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Typep from "../Typep";

export default function Product({ p }) {
  return (
    <div className="griditem">
      <Link to={{ pathname: "/product/" + p._id, product: p }}>
        <img src={p.product.img} alt="Product_Image" />
      </Link>

      <h5 className="h51 flex md-25">
        <Link className="ah" to={{ pathname: "/product/" + p._id, product: p }}>
          {p.product.title}
        </Link>
        <span className="ml-5">
          <Typep type={p.type} />
        </span>
      </h5>

      <p className="parse1 pgl2">{parse(p.product.description)}</p>
      <div className="flexB">
        <div className="int">
          {/* <h6>{p.downloads ? p.downloads.length : 0} Downloads</h6> */}
          <span className="span2 bold">
            {p.subscribers ? p.subscribers.length : 0} Subscribers
          </span>
        </div>
        <div>
          <span className="span1">MT4</span>
          <span className="span1 ml-5">MT5</span>
        </div>
      </div>
    </div>
  );
}
