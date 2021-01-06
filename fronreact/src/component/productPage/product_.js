import React, { useContext } from "react";

import Comis from "./pcomponent/spcom/comis";
import Qanda from "./pcomponent/qanda/qanda";
import Buy from "./pcomponent/buy";
import Productdes from "./pcomponent/desq/productdes";
import Impro from "./pcomponent/impro/impro";

import { ProductC } from "../Hooks/Products";

export default function Product_() {
  const { p } = useContext(ProductC);
  return (
    <>
      <div className="containP">
        <div className="first">
          <div>
            <Productdes />
            <Buy classn="wcost" />
            <Comis
              qa={p.product.qandas.length}
              im={p.product.improvements.length}
            />
            <div id="im">
              <h3 className="h3">Improvements</h3>
              <Impro />
            </div>
            <div id="qa">
              <h3 className="h3">Q&A</h3>
              <Qanda />
            </div>
          </div>

          <Buy />
        </div>
      </div>
    </>
  );
}
