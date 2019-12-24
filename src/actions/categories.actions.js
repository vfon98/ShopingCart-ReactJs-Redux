import * as types from "../constants/actionTypes";
import axios from "../axios/axios.base";
import { CATEGORY_LIST } from "../api/endpoints";

export const fetchCategories = () => {
  return dispatch => {
    axios
      .get(CATEGORY_LIST)
      .then(res => {
        dispatch({
          type: types.FETCH_CATEGORIES,
          payload: res.data
        });
      })
      .catch(console.log);
  };
};

export const changeSelectedCategory = id => {
  return {
    type: types.CHANGE_SELECTED_CATEGORY,
    payload: id
  };
};
