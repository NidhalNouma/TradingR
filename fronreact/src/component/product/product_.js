import React from "react";
import { useSelector } from "react-redux";

import Comis from "./pcomponent/spcom/comis";
import Qanda from "./pcomponent/qanda/qanda";
import Buy from "./pcomponent/buy";
import Productdes from "./pcomponent/desq/productdes";
import Impro from "./pcomponent/impro/impro";

export default function Product_({ sch, product, ver, id, data, sel, setSel }) {
  const ref = useSelector((state) => state.ref);
  return (
    <>
      <div className="containP">
        <div className="first">
          <div>
            <Productdes data={data} />
            <Buy
              classn="wcost"
              sch={sch}
              product={product}
              id={data._id}
              version={ver}
              sel={sel}
              setSel={setSel}
            />
            <Comis qa={data.qandas.length} im={data.improvements.length} />
            <div id="im">
              <h3>Improvement</h3>
              {ref >= 0 && (
                <Impro data={data.improvements} id={data._id} pId={id} />
              )}
            </div>
            <div id="qa">
              <h3>Q&A</h3>
              {ref >= 0 && <Qanda data={data.qandas} id={data._id} pId={id} />}
            </div>
          </div>

          <Buy
            sch={sch}
            product={product}
            id={data._id}
            version={ver}
            sel={sel}
            setSel={setSel}
          />
        </div>
      </div>
    </>
  );
}
