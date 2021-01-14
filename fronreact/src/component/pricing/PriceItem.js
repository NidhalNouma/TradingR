import React from "react";

function PriceItem({ set, bg, val }) {
  const style = {
    backgroundColor: bg && "var(--tcolor)",
  };
  return (
    <div className="p1 pricing-item m1">
      <h4 className="h41 bold">First Members</h4>
      <div className="mu1">
        <span className="spanR crossL mr-5">$199</span>
        <span className="spanR mr-5">$99</span>
        <span className="span bold">/month</span>
      </div>
      <p className="p">
        <ul className="ul">
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
          <li>test 11 kl,rnzgjkehn lknjefibzhgjr</li>
        </ul>
      </p>
      <button className="buttonR" style={style} onClick={() => set(val)}>
        Select
      </button>
    </div>
  );
}

export default PriceItem;
