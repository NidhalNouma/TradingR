import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Typep from "../Typep";
import Imgload from "../Imgload";

export default function Product({ p }) {
  return (
    <div className="griditem img-scale">
      <Link className="ah" to={{ pathname: "/product/" + p._id, product: p }}>
        <div className="pr-img-info">
          <div className="imgd md-5">
            <Imgload src={p.product.img} />
          </div>
          <div className="flexB mu-5 info">
            <div className="int">
              <span className="flexC svg22">
                <span className="span mr-125">
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
        </div>

        <h5 className="h51 flex md-25 mu-5">
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
      </Link>
    </div>
  );
}
