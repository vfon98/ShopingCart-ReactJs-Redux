import { searchByCategory } from "./products.actions";
import * as types from "../constants/actionTypes";

export const nextPage = () => {
  return (dispatch, getState) => {
    let { currentSelected } = getState().categoriesReducer;
    dispatch({ type: types.NEXT_PAGE });
    dispatch(searchByCategory(currentSelected.name));
  };
};

export const previousPage = () => {
  return (dispatch, getState) => {
    let { currentSelected } = getState().categoriesReducer;
    dispatch({ type: types.PREVIOUS_PAGE });
    dispatch(searchByCategory(currentSelected.name));
  };
};

export const gotoPage = page => {
  return (dispatch, getState) => {
    let { currentSelected } = getState().categoriesReducer;
    dispatch({
      type: types.GO_TO_PAGE,
      payload: { page_number: page }
    });
    dispatch(searchByCategory(currentSelected.name));
  };
};
