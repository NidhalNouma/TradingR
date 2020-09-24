import React from "react";

function NotifItem({ data }) {
  return (
    <>
      <div className="profileNotif">
        <img src={data.product.img} alt="notProductImg" />
        <div>
          <p>{data.message}</p>
          <span>{data.product.title}</span>
          <div className="div">
            <i>{data.at}</i>
            <div>
              <span>Mark as Read</span>
              <span>Go to Product</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotifItem;
