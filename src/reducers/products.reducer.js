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
      initialState.products = action.payload;
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };

    case types.FILTER_BY_CATEGORY:
      if (action.payload === "All") {
        return {
          ...state,
          products: [...initialState.products]
        };
      } else {
        return {
          ...state,
          products: initialState.products.filter(
            product => product.category === action.payload
          )
        };
      }
      
    default:
      return state;
  }
};

export default productsReducer;
