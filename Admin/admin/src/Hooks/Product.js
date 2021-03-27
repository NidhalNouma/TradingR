import { useState, useEffect } from "react";
import axios from "axios";

export const PostProduct = (ty, init) => {
  const [post, setPost] = useState({ done: false, err: null });

  const [version, setVersion] = useState(init.version);
  const [title, setTitle] = useState(init.title);
  const [img, setImg] = useState(init.img);
  const [media, setMedia] = useState(init.media);
  const [desc, setDescription] = useState(init.desc);

  const [results, setResults] = useState(init.results);
  const [inputs, setInputs] = useState(init.inputs);
  const [howtouse, setHowtouse] = useState(init.howtouse);
  const [whatsNew, setWhatsnew] = useState(init.whatsNew);

  const [MT4, setMT4] = useState(init.MT4);
  const [MT5, setMT5] = useState(init.MT5);
  const [TV, setTV] = useState(init.TV);

  const [test, setTest] = useState(init.test);
  const [product, setProduct] = useState(init.product);
  const [test5, setTest5] = useState(init.test5);
  const [product5, setProduct5] = useState(init.product5);

  const postP = async (data) => {
    console.log(data);
    const endpoint = data.edit
      ? "edit"
      : data.newVersion
      ? "newversion"
      : "new";
    const r = await axios.post("/api/product/" + endpoint, data);
    console.log(r);
    const res = r.data;
    setPost({ done: res.added, err: res.error });

    setTimeout(() => {
      setPost({ done: false, err: null });
    }, 10000);
  };

  useEffect(() => {
    if (product) setMT4(true);
    if (product5) setMT5(true);
  }, [product, product5]);

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
    setProduct,
    setTest,
    setProduct5,
    setTest5,

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
    test,
    product,
    test5,
    product5,
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
