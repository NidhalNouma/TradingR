const user = (state = getUser(), action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    case "LOGOUT":
      return null;
    case "ADD_TO_CARD": {
      if (state === null) return state;
      else {
        const card = state.card;
        const r = {
          productId: action.payload._id,
          productTitle: action.payload.title,
          productDesc: action.payload.description,
          productPrice: action.payload.price,
          productImg: action.payload.img,
        };
        card.push(r);
        return state;
      }
    }
    case "GET_CARD":
      return state;
    case "ADD_USER_IMPROs":
      return { ...state, improvements: action.payload };
    case "ADD_USER_QUEs":
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

export default user;

let datac = null;

function getUser() {
  const data = document.getElementById("data");
  if (data) {
    const st = data.innerHTML;
    if (st === "<!-- data -->") return null;
    else {
      datac = JSON.parse(st);
      data.remove();
      return datac;
    }
  } else return datac;
}
