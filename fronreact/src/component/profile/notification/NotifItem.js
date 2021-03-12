import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function NotifItem({ data, read }) {
  return (
    <>
      <div
        className="profileNotif"
        style={{ backgroundColor: data.read ? "var(--scolor)" : "" }}
      >
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
              {!data.read && (
                <button className="buttonT tHover mr1 normal" onClick={read}>
                  Mark as Read
                </button>
              )}
              <Link
                to={"/product/" + data.productId}
                onClick={read}
                className="buttonT tHover normal pr1"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotifItem;
