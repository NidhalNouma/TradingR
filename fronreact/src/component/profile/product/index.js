import React, { useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Product from "./Product";

function Myproducts() {
  const [sec, setSec] = useState(0);
  const ind = useSelector((state) => {
    const products = state.user.products;
    const ind = products.filter((item) => item.productType === "INDICATOR");
    return ind;
  });
  const str = useSelector((state) => {
    const products = state.user.products;
    const ind = products.filter((item) => item.productType === "ROBOT");
    return ind;
  });
  const sou = useSelector((state) => {
    const products = state.user.products;
    const ind = products.filter((item) => item.productType === "SOURCE");
    return ind;
  });

  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={2} />
        </div>
        <div className="right">
          <div className="profileproduct">
            <h5 className={sec === 0 && "active"} onClick={() => setSec(0)}>
              Strategys
            </h5>
            <h5 className={sec === 1 && "active"} onClick={() => setSec(1)}>
              Indicators
            </h5>
            <h5 className={sec === 2 && "active"} onClick={() => setSec(2)}>
              Source
            </h5>
          </div>
          {sec === 0 && <Product type="Strategys" data={str} />}
          {sec === 1 && <Product type="Indicators" data={ind} />}
          {sec === 2 && <Product type="Source" data={sou} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Myproducts;
