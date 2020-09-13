import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import Typep from "../Typep";

export default function Product({ load, product }) {
  const to = product._id;
  product = product.product
    ? product.product[product.product.length - 1]
    : product;
  if (product === undefined) return <></>;
  product = product.product ? product.product : product;
  if (product === null) return <></>;
  return (
    <div className="griditem">
      {load ? (
        <Skeleton className="skel-img" variant="rect" />
      ) : (
        <img src={product.img} alt="Product_Image" />
      )}

      {load ? (
        <Skeleton variant="text" width="80%" />
      ) : (
        <h5>
          <Link to={"/product/" + to}>{product.title}</Link>
          <span>
            <Typep type={product.type} />
          </span>
        </h5>
      )}
      {load ? (
        <Skeleton variant="rect" height={50} />
      ) : (
        <p>{product.description}</p>
      )}

      {load ? (
        <Skeleton variant="text" width="20%" />
      ) : (
        <div className="btm">
          <div className="int">
            <h6>${product.price} </h6>
          </div>
          <Link to={"/product/" + to}>See more ...</Link>
        </div>
      )}
    </div>
  );
}
