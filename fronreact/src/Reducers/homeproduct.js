const products = (state = null, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload;
    case "ADD_IMPRO": {
      const id = action.payload.id;
      const pId = action.payload.pId;
      const prr = state.find((i) => i._id === pId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      product.product.improvements.push(action.payload.data);
      return state;
    }
    case "ADD_IMPRO_ANS": {
      const id = action.payload.id;
      const iid = action.payload.iid;
      const pvId = action.payload.pvId;
      const prr = state.find((i) => i._id === pvId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      const imp = product.product.improvements.find((item) => item._id === iid);
      if (!imp) return state;
      imp.answers.push(action.payload.data);
      return state;
    }
    case "ADD_QA": {
      const id = action.payload.id;
      const pId = action.payload.pId;
      const prr = state.find((i) => i._id === pId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      product.product.qandas.push(action.payload.data);
      return state;
    }
    case "ADD_QA_ANS": {
      const id = action.payload.id;
      const iid = action.payload.iid;
      const pvId = action.payload.pvId;
      const prr = state.find((i) => i._id === pvId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      const imp = product.product.qandas.find((item) => item._id === iid);
      if (!imp) return state;
      imp.answers.push(action.payload.data);
      return state;
    }
    case "CH_IMPRO_ID": {
      const id = action.payload.id;
      const pId = action.payload.pId;
      const prr = state.find((i) => i._id === pId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      const imp = product.product.improvements.find(
        (item) => item._id === action.payload.dId
      );
      imp._id = action.payload.improId;
      return state;
    }
    case "PLUS": {
      const id = action.payload.id;
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const improId = action.payload.improId;
      const prr = state.find((i) => i._id === productId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      const p = product.product.improvements.find(
        (item) => item._id === improId
      );
      if (!p) return state;
      p.plus.push(userId);
      return state;
    }
    case "MINUS": {
      const id = action.payload.id;
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const improId = action.payload.improId;
      const prr = state.find((i) => i._id === productId);
      if (!prr) return state;
      const product = prr.product.find((item) => item.product._id === id);
      if (!product) return state;
      const p = product.product.improvements.find(
        (item) => item._id === improId
      );
      if (!p) return state;
      p.minus.push(userId);
      return state;
    }
    default:
      return state;
  }
};

export default products;
