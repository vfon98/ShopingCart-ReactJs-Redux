import axios from 'axios';

// const endpoint = 'products';
const instance = axios.create({
    baseURL: `https://5cd831770cc5100014f1e40b.mockapi.io/`,
    // baseURL: `api.seekproduct.com`
})

export default instance;