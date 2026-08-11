import api from "../../config/api";

export const getMySubscription = () => {
  return api.get("/subscription/mine");
};

export const upgradeSubscription = (plan) => {
  return api.post("/subscription/upgrade", { plan });
};

export const cancelSubscription = () => {
  return api.post("/subscription/cancel");
};

export const getPlans = () => {
  return api.get("/subscription/plans");
};