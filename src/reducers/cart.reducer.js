import * as types from "../constants/actionTypes";

const inintialState = {
  id: null,
  total: 0,
  status: null,
  user: null,
  paid_at: null,
  cart_detail: []
};

const cartReducer = (state = inintialState, action) => {
  let newCart = [];
  let userID = null;
  switch (action.type) {
    case types.FETCH_CART_FROM_API:
      return {
        ...state,
        ...action.payload.cart
      };

    case types.GET_CART_FROM_STORAGE:
      userID = action.payload.userID;
      newCart = action.payload.cart.filter(item => item.userID === userID);
      return {
        ...state,
        cart: newCart
        // totalItems: getCartSize(newCart),
        // totalPrice: getCartPrice(newCart)
      };

    case types.ADD_TO_CART:
      return {
        ...state,
        ...action.payload.cart
      };

    case types.UPDATE_CART_ITEM:
      return {
        ...state,
        ...action.payload.cart
      };

    case types.DELETE_CART_ITEM:
      return {
        ...state,
        ...action.payload.cart
      };

    case types.CLEAR_CART:
      return {
        ...state,
        ...action.payload.cart
      };

    case types.CHECK_OUT_OK:
      return {
        ...state,
        cart_detail: [],
        total: 0,
        paid_at: new Date().toISOString()
      };

    case types.CHECK_OUT_FAILED:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default cartReducer;
