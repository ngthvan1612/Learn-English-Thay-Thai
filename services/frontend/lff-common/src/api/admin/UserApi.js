import axios from "axios";
import { BACKEND_URL_DEVELOPMENT } from "../../types/index";

const getAllUser = async () => {
  return await axios.get(`${BACKEND_URL_DEVELOPMENT}/admin/user`);
};

const createUser = async (user) => {};

export default {
  getAllUser,
};
