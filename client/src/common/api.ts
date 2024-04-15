import axios, { AxiosInstance } from "axios";

const axiosConfig = {
  baseURL: process.env.BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance: AxiosInstance = axios.create(axiosConfig);

export default instance;
