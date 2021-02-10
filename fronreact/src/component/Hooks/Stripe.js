import axios from "axios";

export const createSubscription = async (r) => {
  const response = await axios.post("/api/pay/create-subscription", r);
  return response;
};

export const cancelSubscriptions = async (subId) => {
  const r = await axios.post("/api/pay/cancel-subscription", { subId });
  console.log(r);
};
