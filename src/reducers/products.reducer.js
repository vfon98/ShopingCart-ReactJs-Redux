import * as types from "../constants/actionTypes";

// Product list
const initialState = {
  isLoading: true,
  products: [],
  hasError: false,
  details: {
    feeds: [],
    other_products: [],
    product: {
      tag: '',
      name: '',
      rating: 0,
      price: 0,
      description: '',
      model: '',
      category: [],
      color: '',
      favorites: 0,
    },
    company: {
      logo: null,
      store_name: '',
      address: '',
      phone_number: '',
      productgroup: [],
      social_link: {
        facebook: '',
        instagram: '',
        twitter: '',
      }
    }
  },
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case types.FETCH_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
      
    case types.SEARCH_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };

    case types.DETAIL_PRODUCT:
      return {
        ...state,
        isLoading: false,
        details: action.payload.details
      }

    default:
      return state;
  }
};

export default productsReducer;
