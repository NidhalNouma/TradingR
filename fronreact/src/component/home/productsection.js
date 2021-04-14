import React, { useEffect, useContext } from "react";
import Product from "./product";
import Load from "./Load";
import Noresult from "../Noresult";

import { GetAll } from "../Hooks/AllProducts";
import { SocketC } from "../Hooks/Socket";

export default function Productsection() {
  const la = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 12, 14, 15];

  const { onPP } = useContext(SocketC);
  const { products, getProducts, setProducts } = GetAll();

  useEffect(() => {
    if (products === null) getProducts();
    onPP(products, setProducts);
  }, [products]);

  return (
    <>
      {/* <div className="filter">
        <h5>Recomended</h5>
        <h5>Latest</h5>
        <h5>Popular</h5>
      </div> */}
      {/* <div className="hr"></div> */}
      <div className="gridlist">
        {products !== null && products.length >= 1 ? (
          products.map((i) => <Product key={i._id} p={i} />)
        ) : products !== null && products.length === 0 ? (
          <Noresult />
        ) : (
          la.map((i) => <Load key={i} />)
        )}
      </div>
    </>
  );
}
