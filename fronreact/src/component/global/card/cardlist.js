import React from "react";
import { Link } from "react-router-dom";

export default function Cardlist({ data }) {
  return (
    <>
      <li>
        <Link to={"/product/" + data.productId}>
          <img src={data.productImg} alt="" />

          <div>
            <h5>{data.productTitle}</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <h6>${data.productPrice}</h6>
          </div>
        </Link>
      </li>
    </>
  );
}
