import axios from 'axios';

// const endpoint = 'products';
const instance = axios.create({
    baseURL: `http(s)://5cd831770cc5100014f1e40b.mockapi.io/`
})

export default instance;