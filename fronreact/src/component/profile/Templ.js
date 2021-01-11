import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Up from "../../asset/images/UpArrow";
import Dn from "../../asset/images/dnArrow";

const Templ = ({ data }) => {
  return (
    <>
      <div className="templ">
        <Link to={`/product/${data._id}`}>
          <img src={data.img} alt="" />
        </Link>
        <div>
          <h5 className="h5">{data.title}</h5>
          <p className="pgl3">
            {data.improvement.improvement
              ? data.improvement.improvement
              : data.improvement.question}
          </p>
          <div className="inter">
            <i className="i">{moment(data.improvement.timestamp).fromNow()}</i>
            <div>
              {data.improvement.plus && (
                <>
                  <span>{data.improvement.plus.length}</span>
                  <Up />
                  <span>{data.improvement.minus.length}</span>
                  <Dn />
                </>
              )}

              <span>
                {data.improvement.answers.length}
                {" Answer"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Templ;
