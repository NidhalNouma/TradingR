export const Dark = () => {
  return { type: "ON" };
};

export const Light = () => {
  return { type: "OFF" };
};

export const Products = (payload) => {
  return { type: "GET_PRODUCTS", payload };
};

export const User = (payload) => {
  return { type: "GET_USER", payload };
};

export const AddImpro = (payload) => {
  return { type: "ADD_IMPRO", payload };
};

export const AddImproAns = (payload) => {
  return { type: "ADD_IMPRO_ANS", payload };
};

export const ChImproId = (payload) => {
  return { type: "CH_IMPRO_ID", payload };
};

export const AddQa = (payload) => {
  return { type: "ADD_QA", payload };
};

export const AddQaAns = (payload) => {
  return { type: "ADD_QA_ANS", payload };
};

export const GetCard = (payload) => {
  return { type: "GET_CARD", payload };
};

export const AddUserImp = (payload) => {
  return { type: "ADD_USER_IMPROs", payload };
};

export const AddUserQA = (payload) => {
  return { type: "ADD_USER_QUEs", payload };
};

export const AddtoCard = (payload) => {
  return { type: "ADD_TO_CARD", payload };
};

export const Plus = (payload) => {
  return { type: "PLUS", payload };
};

export const Minus = (payload) => {
  return { type: "MINUS", payload };
};

export const StartIo = (payload) => {
  return { type: "START", payload };
};

export const Emit = (payload) => {
  return { type: "EMIT", payload };
};

export const On = (payload) => {
  return { type: "ONS", payload };
};

export const Onq = (payload) => {
  return { type: "ONQ", payload };
};

export const Onp = (payload) => {
  return { type: "ON+", payload };
};

export const Onm = (payload) => {
  return { type: "ON-", payload };
};

export const OnqA = (payload) => {
  return { type: "ONQA", payload };
};

export const OnA = (payload) => {
  return { type: "ONSA", payload };
};

export const Inc = (payload) => {
  return { type: "INC", payload };
};

export const Subscribe = (payload) => {
  return { type: "SUBSCRIBE", payload };
};

export const Desubscribe = (payload) => {
  return { type: "UNSUBSCRIBE", payload };
};
