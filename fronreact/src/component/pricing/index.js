import React, { useState, useRef, useEffect } from "react";
import Navbar from "../global/navbar";
import Footer from "../global/footer";
import PriceItem from "./PriceItem";

import Done from "./Done";

import Stripe from "./stripe";
import { prices } from "./price";

function Pricing() {
  const [select, setSelect] = useState(null);
  const [ty, setTy] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  }, [select]);

  const fn = (i) => {
    setSelect(i);
    setDone(false);
  };

  return (
    <>
      <Navbar here={true} loc="PRICING" />
      <div className="container">
        <div>
          <div className="tim">
            <span onClick={(e) => setTy(0)} className={ty === 0 ? "t" : ""}>
              Monthly
            </span>
            <span onClick={(e) => setTy(1)} className={ty === 1 ? "t" : ""}>
              Annully
            </span>
          </div>
          <div className="flexA">
            <PriceItem
              data={prices.p1}
              set={fn}
              bg={select === 1}
              val={1}
              ty={ty}
            />
            <PriceItem
              data={prices.p2}
              set={fn}
              bg={select === 2}
              val={2}
              ty={ty}
            />
            <PriceItem
              data={prices.p3}
              set={fn}
              bg={select === 3}
              val={3}
              ty={ty}
            />
          </div>
        </div>
      </div>
      {select && !done && (
        <Stripe
          ty={ty}
          data={select === 1 ? prices.p1 : select === 2 ? prices.p2 : prices.p3}
          setDone={setDone}
        />
      )}
      <div ref={ref} className="mb2"></div>

      {done && (
        <Done
          data={select === 1 ? prices.p1 : select === 2 ? prices.p2 : prices.p3}
        />
      )}
      <Footer />
    </>
  );
}

export default Pricing;
