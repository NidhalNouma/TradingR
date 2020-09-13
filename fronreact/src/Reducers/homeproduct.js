const products = (state = null, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload;
    case "ADD_IMPRO": {
      const id = action.payload.id;
      const product = state.find((item) => item._id === id);
      product.improvements.push(action.payload.data);
      return state;
    }
    case "ADD_IMPRO_ANS": {
      const id = action.payload.id;
      const iid = action.payload.iid;
      const product = state.find((item) => item._id === id);
      const imp = product.improvements.find((item) => item._id === iid);
      imp.answers.push(action.payload.data);
      return state;
    }
    case "ADD_QA": {
      const id = action.payload.id;
      const product = state.find((item) => item._id === id);
      product.qandas.push(action.payload.data);

      return state;
    }
    case "ADD_QA_ANS": {
      const id = action.payload.id;
      const iid = action.payload.iid;
      const product = state.find((item) => item._id === id);
      const imp = product.qandas.find((item) => item._id === iid);
      imp.answers.push(action.payload.data);
      return state;
    }
    case "CH_IMPRO_ID": {
      const id = action.payload.id;
      const product = state.find((item) => item._id === id);
      const imp = product.improvements.find(
        (item) => item._id === action.payload.dId
      );
      imp._id = action.payload.improId;
      return state;
    }
    case "PLUS": {
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const improId = action.payload.improId;
      const p = state
        .find((i) => i._id === productId)
        .improvements.find((i) => i._id === improId);
      p.plus.push(userId);
      return state;
    }
    case "MINUS": {
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const improId = action.payload.improId;
      const p = state
        .find((i) => i._id === productId)
        .improvements.find((i) => i._id === improId);
      p.minus.push(userId);
      return state;
    }
    default:
      return state;
  }
};

export default products;
