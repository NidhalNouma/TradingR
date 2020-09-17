import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Comis from "./pcomponent/spcom/comis";
import Qanda from "./pcomponent/qanda/qanda";
import Buy from "./pcomponent/buy";
import Productdes from "./pcomponent/desq/productdes";
import Impro from "./pcomponent/impro/impro";
import { Products } from "../../Actions";

export default function Product_({ sch }) {
  const [data, setData] = useState(null);
  const [sel, setSel] = useState(null);
  const dispatch = useDispatch();
  let ver = null;
  const { id } = useParams();

  const product = useSelector((state) => {
    if (state.products === null || state.products[0] === undefined) {
      return null;
    } else {
      const p = state.products.find((item) => item._id === id);
      ver = p.product.map((i) => i.version);
      if (sel === null) setSel(ver[ver.length - 1]);
      return p;
    }
  });

  const ref = useSelector((state) => state.ref);

  useEffect(() => {
    if (product === null || product === undefined) {
      axios
        .get("/api/product/find/productversion/" + id)
        .then(function (response) {
          dispatch(Products([response.data.result]));
          setData(
            product.product.find((i) => i.version === parseFloat(sel)).product
          );
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } else {
      setData(
        product.product.find((i) => i.version === parseFloat(sel)).product
      );
    }
  }, [product, sel]);

  return (
    <>
      <div className="containP">
        <div className="first">
          {data ? (
            <div>
              <Productdes data={data} />
              <Comis qa={data.qandas.length} im={data.improvements.length} />
              <div id="im">
                <h3>Improvement</h3>
                {ref >= 0 && (
                  <Impro data={data.improvements} id={data._id} pId={id} />
                )}
              </div>
              <div id="qa">
                <h3>Q&A</h3>
                {ref >= 0 && (
                  <Qanda data={data.qandas} id={data._id} pId={id} />
                )}
              </div>
            </div>
          ) : (
            <div>
              <Skeleton variant="rect" height={500} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rect" height={100} />
            </div>
          )}
          {data ? (
            <Buy
              sch={sch}
              product={product}
              id={data._id}
              version={ver}
              sel={sel}
              setSel={setSel}
            />
          ) : (
            <Skeleton variant="rect" height={240} />
          )}
        </div>
      </div>
    </>
  );
}
