import React, { useState } from "react";

import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Product from "./Product";

function Myproducts(props) {
  const [sec, setSec] = useState(0);
  const ind = null;
  //  useSelector((state) => {
  //   const products = state.user.products;
  //   const ind = products.filter((item) => item.productType === "INDICATOR");
  //   return ind;
  // });
  const str = null;
  // useSelector((state) => {
  //   const products = state.user.products;
  //   const ind = products.filter((item) => item.productType === "ROBOT");
  //   return ind;
  // });
  const sou = null;
  //  useSelector((state) => {
  //   const products = state.user.products;
  //   const ind = products.filter((item) => item.productType === "SOURCE");
  //   return ind;
  // });

  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={props.link} />
        </div>
        <div className="right">
          <div className="profileproduct">
            <h5
              className={sec === 0 ? "active" : undefined}
              onClick={() => setSec(0)}
            >
              Strategys
            </h5>
            <h5
              className={sec === 1 ? "active" : undefined}
              onClick={() => setSec(1)}
            >
              Indicators
            </h5>
            {/* <h5
              className={sec === 2 ? "active" : undefined}
              onClick={() => setSec(2)}
            >
              Source
            </h5> */}
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
