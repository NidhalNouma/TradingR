import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const GetById = (id, p) => {
  const [product, setProduct] = useState(p);

  useEffect(() => {
    if (product === undefined) {
      (async () => {
        const data = await axios.get("/api/product/" + id);
        const r = data.data.result;
        if (r) {
          setProduct(productV(r));
        }
      })();
    }
  }, [product, id]);

  return { product, setProduct };
};

export const improVote = async (
  type,
  user,
  impId,
  authId,
  p,
  setProduct,
  s
) => {
  const endpoint =
    type === "1" ? "/api/product/impro/plus" : "/api/product/impro/minus";

  const data = {
    id: p._id,
    pId: p.product._id,
    impId,
    userId: user._id,
    authId,
  };

  const r = await axios.post(endpoint, data);
  if (r.data.added) {
    const re = addImproVote(p, user, impId, type);
    setProduct(re);
    s.emit("PP", re);
    s.emit("Notif", {
      userId: authId,
      content: {
        readed: false,
        message: "vote to your improvement",
        productId: p._id,
        pId: p.product._id,
        id: impId,
        at: new Date().toString(),
      },
    });
  }
};

export const AddCom = async (type, user, com, p, imgs, setProduct, s) => {
  const endpoint =
    type === "qa"
      ? "/api/product/question"
      : type === "impro"
      ? "/api/product/impro"
      : "";
  const data = {
    id: p._id,
    pId: p.product._id,
    userId: user._id,
    question: com,
    impro: com,
    imgs: imgs,
  };
  const r = await axios.post(endpoint, data);
  if (r.data.added) {
    if (type === "impro") {
      const re = addImpro(p, user, com, r.data.id);
      setProduct(re);
      s.emit("PP", re);
    } else if (type === "qa") {
      const re = addQA(p, user, com, r.data.id);
      setProduct(re);
      s.emit("PP", re);
    }
  }
};

export const AddReply = async (
  type,
  rId,
  user,
  com,
  authId,
  p,
  setProduct,
  s
) => {
  const endpoint =
    type === "qa"
      ? "/api/product/question/answer"
      : type === "impro"
      ? "/api/product/impro/answer"
      : "";
  const data = {
    id: p._id,
    pId: p.product._id,
    rId,
    userId: user._id,
    answer: com,
    authId,
  };
  const r = await axios.post(endpoint, data);
  if (r.data.added)
    if (type === "impro") {
      const r = addImproAns(p, user, com, rId);
      setProduct(r);
      s.emit("PP", r);
    } else if (type === "qa") {
      const r = addQAAns(p, user, com, rId);
      setProduct(r);
      s.emit("PP", r);
    }

  if (r.data.added)
    s.emit("Notif", {
      userId: authId,
      content: {
        readed: false,
        message: "reply to your improvement",
        productId: p._id,
        pId: p.product._id,
        id: rId,
        at: new Date().toString(),
      },
    });
};

export const SubscribeFn = async (userId, sub, p, setProduct, s) => {
  const endpoint = !sub
    ? "/api/product/subscribe"
    : "/api/product/dessubscribe";

  const data = {
    userId: userId,
    pvId: p._id,
  };

  const r = await axios.post(endpoint, data);
  if (r.data.added) {
    const r = {
      ...p,
      subscribers: sub
        ? p.subscribers.filter((i) => i !== userId)
        : [...p.subscribers, userId],
    };
    setProduct(r);
    s.emit("PP", r);
  }
};

export const ProductC = createContext(null);

const productV = (p, id = null) => {
  const r = {
    _id: p._id,
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

export const changeV = (p, id) => {
  if (!id) return p;
  const r = {
    _id: p._id,
    subscribers: p.subscribers,
    downloads: p.downloads,
    show: p.show,
    product: p.ps.filter((i) => i._id === id)[0],
    ps: p.ps,
  };
  return r;
};

const addImpro = (p, user, imp, _id) => {
  const time = new Date().toString();
  const r = {
    ...p,
    product: {
      ...p.product,
      improvements: [
        ...p.product.improvements,
        {
          _id,
          timestamp: time,
          answers: [],
          minus: [],
          plus: [],
          userId: user,
          improvement: imp,
        },
      ],
    },
  };
  return r;
};

const addImproAns = (p, user, ans, id) => {
  const time = new Date().toString();
  const r = {
    ...p,
    product: {
      ...p.product,
      improvements: p.product.improvements.map((i) => {
        if (i._id === id) {
          i.answers.push({
            answer: ans,
            timestamp: time,
            _id: time,
            userId: user,
          });
          return i;
        } else return i;
      }),
    },
  };
  return r;
};

const addImproVote = (p, user, id, type) => {
  const r = {
    ...p,
    product: {
      ...p.product,
      improvements: p.product.improvements.map((i) => {
        if (i._id === id) {
          if (type > 0) i.plus.push(user._id);
          else i.minus.push(user._id);
          return i;
        } else return i;
      }),
    },
  };
  return r;
};

const addQA = (p, user, qa, _id) => {
  const time = new Date().toString();
  const r = {
    ...p,
    product: {
      ...p.product,
      qandas: [
        ...p.product.qandas,
        {
          _id,
          timestamp: time,
          answers: [],
          userId: user,
          question: qa,
        },
      ],
    },
  };
  return r;
};

const addQAAns = (p, user, ans, id) => {
  const time = new Date().toString();
  const r = {
    ...p,
    product: {
      ...p.product,
      qandas: p.product.qandas.map((i) => {
        if (i._id === id) {
          i.answers.push({
            answer: ans,
            timestamp: time,
            _id: time,
            userId: user,
          });
          return i;
        } else return i;
      }),
    },
  };
  return r;
};
