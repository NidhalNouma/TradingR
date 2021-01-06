import React from "react";
import Navbar from "../global/navbar";
import Footer from "../global/footer";
import PriceItem from "./PriceItem";

function Pricing() {
  return (
    <>
      <Navbar here={true} loc="PRICING" />
      <div className="container">
        <div className="flexA">
          <PriceItem />
          <PriceItem />
          <PriceItem />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
