export default (state = null, action) => {
  switch (action.type) {
    case "SETNOTIF":
      return action.payload;
    case "ADDNOTUF": {
      state.push(action.payload);
      return state;
    }
    default:
      return state;
  }
};
