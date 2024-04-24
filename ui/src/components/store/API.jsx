import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/";
export const API = axios.create({ baseURL: baseURL });
export const setBaseURL = (baseURL) => {
  API.defaults.baseURL = baseURL;
};
