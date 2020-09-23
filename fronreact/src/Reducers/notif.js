export default (state = null, action) => {
  switch (action.type) {
    case "SETNOTIF":
      return action.payload;
    default:
      return state;
  }
};
