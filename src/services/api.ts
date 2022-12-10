import { AppError } from "@utils/AppError";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.30.214.51:3333"
});

api.interceptors.response.use((response) => response, 
  async (requestError) => {
    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  }
)