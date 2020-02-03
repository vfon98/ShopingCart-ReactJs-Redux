import axios from 'axios';

const { hostname } = window.location;
const baseURL = 'http://api.seekproduct.com';
const instance = axios.create({
  // Use proxy server to avoid CORS
  baseURL:
    hostname === 'localhost'
      ? baseURL
      : `https://cors-anywhere.herokuapp.com/${baseURL}`
});

export default instance;
