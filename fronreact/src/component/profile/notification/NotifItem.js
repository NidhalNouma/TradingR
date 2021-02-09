import React from "react";
import moment from "moment";

function NotifItem({ data }) {
  return (
    <>
      <div className="profileNotif">
        {/* <img src={data.product.img} alt="notProductImg" /> */}
        <div>
          <p>
            ►
            <span className="span1 mr-5 bold">
              {data.fromId ? data.fromId.userName : "New"}
            </span>
            {data.message}
          </p>
          {/* <span>{data.product.title}</span> */}
          <div className="flexB">
            <i className="i1 mu-5">{moment(data.at).fromNow()}</i>
            <div>
              <button className="buttonT tHover mr1 normal">
                Mark as Read
              </button>
              <button className="buttonT tHover normal">View</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotifItem;
