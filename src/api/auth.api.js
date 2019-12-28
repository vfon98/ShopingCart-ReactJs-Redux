import { auth } from "./endpoints";
import axios from "../axios/axios.base";

export const registerAccount = accountInfo => {
  return axios.post(auth.REGISTER, accountInfo);
};

export const login = (email, password) => {
  const body = { email, password };
  return axios.post(auth.LOGIN, body);
};

export const logout = token => {
  return axios.get(auth.LOGOUT, { headers: { Authorization: `JWT ${token}` } });
};
