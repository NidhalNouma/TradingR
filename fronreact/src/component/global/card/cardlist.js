import React from "react";
import { Link } from "react-router-dom";

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
          to={data.product._id && "/product/" + data.product._id}
        >
          <img src={data.product.img && data.product.img} alt="" />

          <div>
            <p className="pgl2">{"-> " + data.message}</p>
            <h5 className="h5">{data.product.title}</h5>
            <i className="i1">{data.at}</i>
          </div>
        </Link>
      </li>
    </>
  );
}
