import axios from "axios";
import config from "../config/config";

export const GetFeatures = async () => {
  return await axios.get(`${config.baseURL}/features`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetFeatureRights = async () => {
  return await axios.get(`${config.baseURL}/featurerights`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};