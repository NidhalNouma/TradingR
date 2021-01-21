import axios from "axios";

export const createSubscription = async (r) => {
  const response = await axios.post("/api/pay/create-subscription", r);
  return response;
};
