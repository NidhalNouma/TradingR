import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../global/navbar";
import Product from "../product/product_";
import Footer from "../global/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Products } from "../../Actions";

import Change from "../change";
import Loadp from "../product/Loadp";
import Noresult from "../Noresult";

export default function Producte(props) {
  const { change, vchange } = Change();
  const [data, setData] = useState(null);
  const [nodata, setNoData] = useState(false);
  const [sel, setSel] = useState(null);
  let ver = null;
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { id } = useParams();

  const product = useSelector((state) => {
    if (state.products === null || state.products[0] === undefined) {
      return null;
    } else {
      const p = state.products.find((item) => item._id === id);
      if (!p) {
        return state;
      }
      ver = p.product.map((i) => i.version);
      if (sel === null) setSel(ver[ver.length - 1]);
      return p;
    }
  });

  useEffect(() => {
    if (product === null || product === undefined) {
      axios
        .get("/api/product/find/productversion/" + id)
        .then(function (response) {
          if (response.data.find) {
            dispatch(Products([response.data.result]));
            setData(
              product.product.find((i) => i.version === parseFloat(sel)).product
            );
          } else {
            setNoData(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } else {
      if (product.product)
        setData(
          product.product.find((i) => i.version === parseFloat(sel)).product
        );
      else setNoData(true);
    }
  }, [product, sel]);

  return (
    <>
      <Navbar here={true} ch={vchange} />
      {data ? (
        <Product
          sch={change}
          product={product}
          data={data}
          ver={ver}
          id={id}
          sel={sel}
          setSel={setSel}
        />
      ) : nodata ? (
        <Noresult margin="19vh" />
      ) : (
        <Loadp />
      )}
      <Footer />
    </>
  );
}
