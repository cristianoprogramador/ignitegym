import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.24:3333/",
});

// api.interceptors.request.use(
//   (config) => {
//     console.log("DADOS ENVIADOS", config.data);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log("INTERCEPTOR RESPONSE ERROR", response);
//     return response;
//   },
//   (error) => {
//     console.log("INTERCEPTOR RESPONSE ERROR", error);
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
