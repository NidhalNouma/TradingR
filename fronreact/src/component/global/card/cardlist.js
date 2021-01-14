import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Cardlist({ data }) {
  return (
    <>
      <li
        style={{
          backgroundColor: data.readed ? "var(--scolor)" : "",
        }}
      >
        <Link
          className="flexB at"
          to={data.productId && "/product/" + data.productId}
        >
          {/* <img src={data.product.img && data.product.img} alt="" /> */}

          <div>
            <p className="pgl2">{"-> " + data.message}</p>
            {/* <h5 className="h5">{data.product.title}</h5> */}
            <i className="i1">{moment(data.at).fromNow()}</i>
          </div>
        </Link>
      </li>
    </>
  );
}
