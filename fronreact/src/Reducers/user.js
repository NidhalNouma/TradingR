const user = (state = getUser(), action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
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
      return { ...state, cards: getC("_SSDc") };
    case "ADD_USER_IMPROs":
      return { ...state, improvements: action.payload };
    case "ADD_USER_QUEs":
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

export default user;

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getC(name) {
  if (getCookie(name)) {
    try {
      const userc = decodeURIComponent(getCookie(name));
      if (userc) return JSON.parse(userc);
    } catch (e) {
      console.error(e);
    }
  }
  return null;
}

let datac = null;

function getUser() {
  const data = document.getElementById("data");
  if (data) {
    const st = data.innerHTML;

    if (st === "<!-- data -->") return null;
    else {
      datac = JSON.parse(st);
      data.remove();
      // console.log(datac);
      return datac;
    }
  } else return datac;
}
