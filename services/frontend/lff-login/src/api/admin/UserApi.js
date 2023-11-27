import axios from "axios";
import { BACKEND_URL_DEVELOPMENT } from "../../types/index";

const getAllUser = async () => {
  return await axios.get(`${BACKEND_URL_DEVELOPMENT}admin/user`);
};

const userLogin = async (username, password) => {
  return await axios.post(`${BACKEND_URL_DEVELOPMENT}common/user/login`, {
    username,
    password,
  });
};

const createUser = async (user) => {};

export { getAllUser, userLogin };
