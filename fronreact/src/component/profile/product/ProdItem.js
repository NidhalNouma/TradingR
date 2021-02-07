import React from "react";
import { Link } from "react-router-dom";
import Parse from "html-react-parser";

function ProdItem({ data }) {
  return (
    <>
      <div className="contprod">
        <img src={data.products[0].img} alt="productImg" />
        <div>
          <h5 className="h5">{data.products[0].title}</h5>
          <p className="parse1 pgl2">{Parse(data.products[0].description)}</p>
          <div className="mu1">
            <a className="abtn" href="/">
              Download
            </a>
            <Link className="abtn" to={"/product/" + data._id}>
              View product
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdItem;
