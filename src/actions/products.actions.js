import axios from "../axios/axios.base";
import * as types from "../constants/actionTypes";
import { PRODUCTS_LIST } from "../api/endpoints";

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
        // dispatch({
        //   type: types.FILTER_BY_CATEGORY,
        //   payload: category
        // });
      })
      .catch(err => console.log(err));
  };
};

const getCategoriesFromProductsList = productsList => {
  let categoriesName = [];
  productsList.forEach(product => categoriesName.push(product.category));
  let uniqueCategoriesName = [...new Set(categoriesName)];
  // Simple add id attribute for each element
  return uniqueCategoriesName.map((name, index) => ({
    id: index,
    name: name
  }));
};

export const filterByCategory = category => {
  return {
    type: types.FILTER_BY_CATEGORY,
    payload: category
  };
};
