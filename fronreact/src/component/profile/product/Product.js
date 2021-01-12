import React from "react";
import ProdItem from "./ProdItem";
import Noprod from "./Noprod";
import Loadp from "../Loadp";

function Product({ data, type }) {
  console.log(data);
  return (
    <>
      {data && data.length > 0 ? (
        data.map((data) => <ProdItem data={data} />)
      ) : data && data.length === 0 ? (
        <Noprod type={type} />
      ) : (
        <Loadp l={160} />
      )}
    </>
  );
}

export default Product;
