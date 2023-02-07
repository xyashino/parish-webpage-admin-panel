import axios from "axios";

export const HttpRequest = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
