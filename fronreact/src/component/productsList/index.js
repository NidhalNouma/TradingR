import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../../Actions";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../global/navbar";
import Navfill from "../global/navfil";
import Productlist from "../product/productlist";
import Footer from "../global/footer";

import Change from "../change";
import Loadpl from "../product/Loadpl";
import Noresult from "../Noresult";

function Products_(props) {
  const { change, vchange } = Change();
  let { query } = useParams();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [data, setData] = useState(null);
  // if (query === "") {
  //   return state.products;
  // } else {
  //   const f = state.products.filter((item) => item.title.includes(query));
  //   console.log(f);
  //   return f;
  // }

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (products === null || products.length === 1) {
      axios
        .get("/api/product/findall/productversion")
        .then(function (response) {
          dispatch(Products(response.data.results));
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    } else {
      setData(
        products.filter((product) => {
          product = product.product[product.product.length - 1].product;
          if (props.type === "SEARCH")
            return product.title.toLowerCase().includes(query.toLowerCase());
          else return product.type === props.type;
        })
      );
    }
  }, [products, props.type, query]);

  const nopr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <Navbar here={false} search={query} loc={props.type} ch={vchange} />
      <Navfill />

      {products !== null && products.length > 1 && data ? (
        data.length > 0 ? (
          data.map((product) => (
            <Productlist
              key={product._id}
              id={product._id}
              subscribers={product.subscribers}
              downloads={product.numberOfDownload}
              product={product.product[product.product.length - 1].product}
              sch={change}
            />
          ))
        ) : (
          <Noresult />
        )
      ) : (
        nopr.map((product) => <Loadpl key={product} />)
      )}

      <br />
      <Footer />
    </>
  );
}

export default Products_;
