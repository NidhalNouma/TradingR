import { useState, useEffect } from "react";
import axios from "axios";

export const PostProduct = (type) => {
  const [post, setPost] = useState({ done: false, err: null });
  const [data, setData] = useState({
    type,
    version: "1",
    title: "",
    description: "",
    img: "",
    media: "",
    available: {
      MT4: false,
      MT5: false,
      tradingView: false,
    },
  });

  const setVersion = (e) => setData({ ...data, version: e });
  const setTitle = (e) => setData({ ...data, title: e });
  const setDescription = (e) => setData({ ...data, description: e });
  const setImg = (e) => setData({ ...data, img: e });
  const setMedia = (e) => setData({ ...data, media: e });
  const setMT4 = (e) =>
    setData({ ...data, available: { ...data.available, MT4: e } });
  const setMT5 = (e) =>
    setData({ ...data, available: { ...data.available, MT5: e } });
  const setTV = (e) =>
    setData({ ...data, available: { ...data.available, tradingView: e } });

  const postP = async () => {
    const r = await axios.post("/api/product/new", data);
    console.log(r);
    const res = r.data;
    setPost({ done: res.added, err: res.error });
    if (res.added)
      setData({
        type,
        version: "1",
        title: "",
        description: "",
        img: "",
        media: "",
        available: {
          MT4: false,
          MT5: false,
          tradingView: false,
        },
      });
    setTimeout(() => {
      setPost({ done: false, err: null });
    }, 10000);
  };

  return {
    post,
    postP,
    data,
    setTitle,
    setDescription,
    setVersion,
    setMT4,
    setMT5,
    setTV,
    setImg,
    setMedia,
  };
};

export const FindProducts = (type) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const r = await axios.get("/api/product?type=" + type);

    if (r.data.results) {
      let res = r.data.results;
      res = res.map((i) => productV(i));
      setProduct(res);
    }
  };

  return { getAll, product };
};

const productV = (p, id = null) => {
  const r = {
    _id: p._id,
    sub: p.subscribers,
    downloads: p.downloads,
    show: p.show,
    product:
      id === null
        ? p.products[p.products.length - 1]
        : p.products.map((i) => (i._id = id)),
    ps: p.products,
  };

  // console.log(r);
  return r;
};
