import axios from "axios";
import config from "../config/config";

export const GetCompanies = async () => {
  return await axios.get(`${config.baseURL}/companies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};