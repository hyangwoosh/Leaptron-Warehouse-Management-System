import axios from "axios";
import config from "../config/config";

export const GetProduct = async (id: string) => {
  return await axios.get(`${config.baseURL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const GetAllProducts = async ({pageParam = 0}) => {
  const response = await axios.get(`${config.baseURL}/products?limit=5&page=${pageParam * 5}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return {response, nextPage: pageParam + 1, totalPages: Math.ceil(response.data[0].full_count/5)}
};