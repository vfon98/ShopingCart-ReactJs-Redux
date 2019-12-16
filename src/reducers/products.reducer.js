import * as types from "../constants/actionTypes";

// Product list
const initialState = {
  isLoading: true,
  products: [],
  hasError: false
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
    default:
      return state;
  }
};

export default productsReducer;
