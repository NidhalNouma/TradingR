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
        <Link to={"/product/" + data.product._id}>
          <img src={data.product.img} alt="" />

          <div>
            <p>{"-> " + data.message}</p>
            <h5>{data.product.title}</h5>
            <span>{data.at}</span>
          </div>
        </Link>
      </li>
    </>
  );
}
