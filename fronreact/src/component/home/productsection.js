import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../../Actions";
import Product from "./product";

export default function Productsection() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [load, setLoad] = useState(false);
  const la = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  useEffect(() => {
    if (products === null || products.length === 1) {
      setLoad(true);
      axios
        .get("/api/product/findall/productversion")
        .then(function (response) {
          dispatch(Products(response.data.results));
          setLoad(false);
          // console.log(response.data.results[0].product);
        })
        .catch(function (error) {
          console.log(error.data);
        })
        .then(function () {});
    }
  }, []);

  return (
    <>
      <div className="gridlist">
        {products !== null && products.length > 1
          ? products.map((item) => {
              return (
                <Product
                  key={item._id ? item._id : item}
                  load={load}
                  product={item}
                />
              );
            })
          : la.map((item) => {
              return (
                <Product
                  key={item._id ? item._id : item}
                  load={load}
                  product={item}
                />
              );
            })}
      </div>
    </>
  );
}
