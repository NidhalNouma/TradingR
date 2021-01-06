import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../global/navbar";
import Product from "./product_";
import Footer from "../global/footer";

import Loadp from "./Loadp";
import Noresult from "../Noresult";

import { GetById, ProductC } from "../Hooks/Products";
import { SocketC } from "../Hooks/Socket";

export default function Producte(props) {
  const { id } = useParams();
  const [nodata, setNoData] = useState(false);
  const { onP } = useContext(SocketC);
  const { product, setProduct } = GetById(id, props.location.product);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    onP(setProduct);
  }, [pathname]);

  return (
    <>
      <Navbar here={true} />
      {product ? (
        <ProductC.Provider value={{ p: product, setProduct }}>
          <Product />
        </ProductC.Provider>
      ) : nodata ? (
        <Noresult margin="19vh" />
      ) : (
        <Loadp />
      )}
      <Footer />
    </>
  );
}
