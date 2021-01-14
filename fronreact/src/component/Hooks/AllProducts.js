import { useState, createContext } from "react";
import axios from "axios";

export const GetAll = (ty) => {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    setProducts(null);
    const data = await axios.get("/api/product?type=" + ty);
    let res = data.data.results;
    if (res) {
      res = res.map((i) => productV(i));
      setProducts(res);
    }
  };

  return { products, getProducts, setProducts };
};

const productV = (p, id = null) => {
  const r = {
    _id: p._id,
    type: p.type,
    subscribers: p.subscribers,
    downloads: p.downloads,
    show: p.show,
    product:
      id === null
        ? p.products[p.products.length - 1]
        : p.products.filter((i) => i._id === id)[0],
    ps: p.products,
  };
  return r;
};

export const AllProductsC = createContext(null);
