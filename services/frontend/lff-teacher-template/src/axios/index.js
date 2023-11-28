import axios from "axios";
import { getAccessToken } from "../authorization";

const REACT_BACKEND_URL =
  process.env.NODE_ENV == "development"
    ? "https://localhost:5001/api/v1.0/"
    : "/api/v1.0/";

const instance = axios.create({
  baseURL: REACT_BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = getAccessToken();
  return config;
});

async function sendGet(url, config) {
  return await instance.get(url, config);
}

async function sendPost(url, data, config) {
  return await instance.post(url, data, config);
}

async function sendPut(url, data, config) {
  return await instance.put(url, data, config);
}

async function sendDelete(url, data, config) {
  return await instance.delete(url, data, config);
}

export { sendGet, sendPost, sendPut, sendDelete, instance };
