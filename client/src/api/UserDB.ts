import axios from "axios";
import config from "../config/config";


// export const LoginUser = async (formData) => {
//     return await axios.post(`${config.baseURL}/login`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };
  
  export const LoginUser = async (formData) => {
    return await axios.post(`${config.baseURL}/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  

export const GetUser = async (id: string) => {
    return await axios.get(`${config.baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

export const GetAllUsers = async () => {
    return await axios.get(`${config.baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  
export const PostUser = async (formData) => {
    return await axios.post(`${config.baseURL}/user`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const UpdateUser = async (formData, id: string) => {
    return await axios.put(`${config.baseURL}/user/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  export const DeleteUser = async (id: string) => {
    return await axios.delete(`${config.baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  

export const SearchUser = async (name: string) => {
    return await axios.get(`${config.baseURL}/user?name=${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  