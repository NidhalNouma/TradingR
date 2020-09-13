import React from "react";
import ProdItem from "./ProdItem";
import Noprod from "./Noprod";

function Product({ data, type }) {
  return (
    <>
      {data && data.length > 0 ? (
        data.map((data) => <ProdItem data={data} />)
      ) : (
        <Noprod type={type} />
      )}
    </>
  );
}

export default Product;
