import axios from "../axios/axios.base";
import * as types from "../constants/actionTypes";
import { PRODUCTS_LIST, SEARCH_CATEGORY } from "../api/endpoints";

// Fetch all products from mock API
export const fetchProducts = category => {
  return (dispatch, getState) => {
    const { pagination } = getState();
    axios
      .get(PRODUCTS_LIST, {
        params: {
          page: pagination.currentPage,
          page_size: pagination.pageSize
        }
      })
      .then(res => {
        dispatch({
          type: types.FETCH_PRODUCTS,
          payload: res.data.results
        });
      })
      .catch(err => console.log(err));
  };
};


export const searchByCategory = (category) => {
  const data = {
    key_word: '',
    category: category === 'All' ? '' : category,
  } 
  return (dispatch, getState) => {
    const { pagination } = getState();
    axios.post(SEARCH_CATEGORY, data, { params: {
      page: 1,
      page_size: pagination.pageSize
    }}).then(res => {
      console.log("PAGI", res.data)
      dispatch({
        type: types.FETCH_PRODUCTS,
        payload: res.data.results
      })
    }).catch(console.log);
  }
};
