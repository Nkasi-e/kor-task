import axios from "axios";

const instance = axios.create({
  baseURL: "localhost:8000/v1",
});

export const url = "http://localhost:8000/v1";

export default instance;
