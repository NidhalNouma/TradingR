import React from "react";

function PaymentItem({ i, pm, set }) {
  return (
    <div
      onClick={() => set(i.id)}
      className="flex mu1 md1 p-5 borderT bgtHover"
      style={{ backgroundColor: pm === i.id ? "var(--tcolor)" : "" }}
    >
      <span className="spanC bold mr1 ">
        {/* {i.card.brand === "visa" ? (
          <Visa />
        ) : i.card.brand === "mastercard" ? (
          <Mastercard />
        ) : (
          i.card.brand
        )} */}
        {i.card.brand}
      </span>

      <div className="">
        <span className="span2 bold block"> ****{i.card.last4} </span>
        <span className="spanH bold">
          Expire on {i.card.exp_month}/{i.card.exp_year}
        </span>
      </div>
    </div>
  );
}

export default PaymentItem;
