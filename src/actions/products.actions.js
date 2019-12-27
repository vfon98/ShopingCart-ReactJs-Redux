import axios from "../axios/axios.base";
import * as types from "../constants/actionTypes";
import { PRODUCTS_LIST, SEARCH_CATEGORY } from "../api/endpoints";

// Fetch all products from mock API
export const fetchProducts = category => {
  return (dispatch, getState) => {
    const { pagination } = getState();
    dispatch({ type: types.PRODUCT_PENDING });
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

// Search dispatch the same action
export const searchByCategory = category => {
  const data = {
    key_word: "",
    category: category === "All" ? "" : category
  };
  return (dispatch, getState) => {
    dispatch({ type: types.PRODUCT_PENDING });
    const pagination = getState().paginationReducer;
    axios
      .post(SEARCH_CATEGORY, data, {
        params: {
          page: pagination.currentPage,
          page_size: pagination.pageSize
        }
      })
      .then(res => {
        dispatch({
          type: types.SEARCH_PRODUCTS,
          payload: res.data.results
        });

        dispatch({
          type: types.CREATE_PAGINATION,
          payload: { page: res.data }
        });
      })
      .catch(err => console.log({err}));
  };
};
