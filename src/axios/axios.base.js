import axios from "axios";

const instance = axios.create({
  // baseURL: `https://5cd831770cc5100014f1e40b.mockapi.io/`,
  baseURL: `http://api.seekproduct.com`
});

export default instance;
