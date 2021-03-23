import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Typep from "../Typep";
import Imgload from "../Imgload";

export default function Product({ p }) {
  return (
    <div className="griditem">
      <Link className="ah" to={{ pathname: "/product/" + p._id, product: p }}>
        {/* <img src={p.product.img} alt="Product_Image" /> */}
        <div className="imgd md-5">
          <Imgload src={p.product.img} />{" "}
        </div>

        <h5 className="h51 flex md-25">
          <Link
            className="ah"
            to={{ pathname: "/product/" + p._id, product: p }}
          >
            {p.product.title}
          </Link>
          <span className="ml-5">
            <Typep type={p.type} />
          </span>
        </h5>

        <p className="parse1 pgl2">{parse(p.product.description)}</p>
        <div className="flexB mu-5">
          <div className="int">
            <span className="flexC bold svg22">
              <span className="mr-25 span">
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
      </Link>
    </div>
  );
}
