import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../global/navbar";
import Product from "../product/product_";
import Footer from "../global/footer";

import Change from "../change";

export default function Producte(props) {
  const { change, vchange } = Change();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar here={true} ch={vchange} />
      <Product sch={change} />
      <Footer />
    </>
  );
}
