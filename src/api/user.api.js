import axios from "../axios/axios.base";
import { user } from "./endpoints";

export const getUserProfile = token => {
  return axios.get(user.USER_PROFILE, {
    headers: { Authorization: `JWT ${token}` }
  });
};
