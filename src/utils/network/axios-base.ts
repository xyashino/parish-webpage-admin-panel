import axios from "axios";

export const AxiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin":"*"
  },
});
