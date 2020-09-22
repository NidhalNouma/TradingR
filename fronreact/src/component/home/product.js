import React from "react";
import { Link } from "react-router-dom";
import Typep from "../Typep";

export default function Product({ product }) {
  const mainp = product;
  const to = product._id;
  product = product.product
    ? product.product[product.product.length - 1]
    : product;
  if (product === undefined) return <></>;
  product = product.product ? product.product : product;
  if (product === null) return <></>;
  return (
    <div className="griditem">
      <Link to={"/product/" + to}>
        <img src={product.img} alt="Product_Image" />
      </Link>

      <h5>
        <Link to={"/product/" + to}>{product.title}</Link>
        <span>
          <Typep type={product.type} />
        </span>
      </h5>

      <p>{product.description}</p>
      <div className="btm">
        <div className="int">
          <h6>
            {mainp.numberOfDownload && mainp.numberOfDownload.length} Downloads
          </h6>
        </div>
        <div>
          <span>MT4</span>
          <span>MT5</span>
        </div>
      </div>
    </div>
  );
}
