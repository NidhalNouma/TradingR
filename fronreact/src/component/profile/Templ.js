import React from "react";
import { Link } from "react-router-dom";
import Up from "../../asset/images/UpArrow";
import Dn from "../../asset/images/dnArrow";

const Templ = ({ vote, data }) => {
  const tem = data.pId.improvements
    ? data.pId.improvements.find((i) => i._id === data.impId)
    : data.pId.qandas.find((i) => i._id === data.quesId);

  return (
    <>
      <div className="templ">
        <Link to={`/product/${data.pId._id}`}>
          <img src={data.pId.img} alt="" />
        </Link>
        <div>
          <h5>{data.title}</h5>
          <p>
            {"->"}{" "}
            {data.pId.improvements
              ? tem.improvement.substr(0, 200)
              : tem.question.substr(0, 200)}
            ...
          </p>
          <div className="inter">
            <i>Date</i>
            <div>
              {vote && (
                <>
                  <span>{data.pId.improvements[0].plus.length}</span>
                  <Up />
                  <span>{data.pId.improvements[0].minus.length}</span>
                  <Dn />
                </>
              )}

              <span>
                {tem.answers.length}
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
