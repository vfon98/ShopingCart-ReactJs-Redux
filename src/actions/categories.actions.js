import * as types from '../constants/actionTypes'

export const changeSelectedCategory = id => {
  return {
    type: types.CHANGE_SELECTED_CATEGORY,
    payload: id
  };
};

export const assignCategories = categories => {
  return {
    type: types.ASSIGN_CATEGORIES,
    payload: categories
  };
};