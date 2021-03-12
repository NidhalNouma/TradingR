import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Cardlist({ data, read }) {
  // console.log(data);
  return (
    <>
      <li
        style={{
          backgroundColor: data.read ? "var(--scolor)" : "",
        }}
      >
        <Link
          className="flexB at"
          onClick={read}
          to={"/product/" + data.productId}
        >
          {/* <img src={data.product.img && data.product.img} alt="" /> */}

          <div>
            <p className="pgl2">
              ►{" "}
              <span className="span1 mr-5">
                {data.fromId ? data.fromId.userName : "New"}
              </span>
              {data.message}
            </p>
            {/* <h5 className="h5">{data.product.title}</h5> */}
            <i className="i1">{moment(data.at).fromNow()}</i>
          </div>
        </Link>
      </li>
    </>
  );
}
