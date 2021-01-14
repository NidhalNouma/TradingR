import React, { useState } from "react";
import Navbar from "../global/navbar";
import Footer from "../global/footer";
import PriceItem from "./PriceItem";

import Stripe from "./stripe";

function Pricing() {
  const [select, setSelect] = useState(null);
  return (
    <>
      <Navbar here={true} loc="PRICING" />
      <div className="container">
        <div>
          <div className="flexA">
            <PriceItem set={setSelect} bg={select === 1} val={1} />
            <PriceItem set={setSelect} bg={select === 2} val={2} />
            <PriceItem set={setSelect} bg={select === 3} val={3} />
          </div>
          {select && <Stripe />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
