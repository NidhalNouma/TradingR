import React from "react";
import { Link } from "react-router-dom";

function ProdItem({ data }) {
  return (
    <>
      <div className="contprod">
        <img src={data.productImg} />
        <div>
          <h5>{data.productTitle}</h5>
          <p>{data.productDesc}</p>
          <div>
            <a>Download</a>
            <Link to={"/product/" + data.productId}>View product</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdItem;
