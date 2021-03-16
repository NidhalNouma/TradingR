import React, { useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../global/navbar";
// import Navfill from "../global/navfil";
import Filter from "./Filter";
import Productlist from "./productlist";
import Footer from "../global/footer";
import Loadpl from "./Loadpl";
import Noresult from "../Noresult";

import { GetAll } from "../Hooks/AllProducts";
import { SocketC } from "../Hooks/Socket";

function Products_({ type }) {
  let { query } = useParams();

  const { products, getProducts, setProducts } = GetAll(
    type === "ROBOT" ? "EA" : "INDICATOR" ? "Indicator" : undefined
  );
  const { onPP } = useContext(SocketC);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [pathname]);

  const nopr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33, 44];

  useEffect(() => {
    // if (products === null) getProducts();
    onPP(products, setProducts);
  }, [products]);

  return (
    <>
      <Navbar here={true} search={query} loc={type} />
      {/* <Navfill /> */}
      <div className="full-hight">
        <div className={"container-PL"}>
          <Filter />
          {products !== null ? (
            products.length > 0 ? (
              products.map((product) => (
                <>
                  <Productlist key={product._id} p={product} />
                </>
              ))
            ) : (
              <Noresult />
            )
          ) : (
            nopr.map((product) => <Loadpl key={product} />)
          )}
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default Products_;
