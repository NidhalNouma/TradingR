import { useState, useEffect } from "react";
import axios from "axios";

export const PostProduct = () => {
  const [post, setPost] = useState({ done: false, err: null });

  const [version, setVersion] = useState("1");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [media, setMedia] = useState("");
  const [desc, setDescription] = useState("");

  const [results, setResults] = useState([]);
  const [inputs, setInputs] = useState("");
  const [howtouse, setHowtouse] = useState("");
  const [whatsNew, setWhatsnew] = useState("");

  const [MT4, setMT4] = useState(false);
  const [MT5, setMT5] = useState(false);
  const [TV, setTV] = useState(false);

  const postP = async (data) => {
    console.log(data);
    const r = await axios.post("/api/product/new", data);
    console.log(r);
    const res = r.data;
    setPost({ done: res.added, err: res.error });

    setTimeout(() => {
      setPost({ done: false, err: null });
    }, 10000);
  };

  return {
    post,
    postP,

    setTitle,
    setDescription,
    setVersion,
    setMT4,
    setMT5,
    setTV,
    setImg,
    setMedia,
    setResults,
    setInputs,
    setHowtouse,
    setWhatsnew,

    version,
    title,
    img,
    media,
    desc,
    results,
    inputs,
    howtouse,
    whatsNew,
    MT4,
    MT5,
    TV,
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
