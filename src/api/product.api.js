import axios from '../axios/axios.base';
import { product } from './endpoints';

export const searchByCategory = (category, page, page_size) => {
  const body = {
    key_word: '',
    category: category === 'All' ? '' : category
  };
  return axios.post(product.SEARCH_CATEGORY, body, {
    params: { page, page_size }
  });
};

export const detailProduct = id => {
  return axios.get(product.PRODUCT_DETAIL(id));
};
