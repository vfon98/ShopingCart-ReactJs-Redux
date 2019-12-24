import * as types from "../constants/actionTypes";

const inintialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0
};

function getCartSize(cart) {
  return cart.length;
}

function getCartPrice(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

const cartReducer = (state = inintialState, action) => {
  let newCart = [];
  let userID = null;
  switch (action.type) {
    case types.FETCH_CART_FROM_API:
      userID = action.payload.userID;
      // Because mockAPI doesn't have filter function
      newCart = action.payload.cart.filter(item => item.userID === userID);
      return {
        ...state,
        cart: newCart,
        totalItems: getCartSize(newCart),
        totalPrice: getCartPrice(newCart)
      };

    case types.GET_CART_FROM_STORAGE:
      userID = action.payload.userID;
      newCart = action.payload.cart.filter(item => item.userID === userID);
      return {
        ...state,
        cart: newCart,
        totalItems: getCartSize(newCart),
        totalPrice: getCartPrice(newCart)
      };

    case types.ADD_TO_CART:
      newCart = [...state.cart, action.payload];
      console.log(newCart)
      return {
        ...state,
        cart: newCart,
        totalItems: getCartSize(newCart),
        totalPrice: getCartPrice(newCart)
      };

    case types.UPDATE_CART_ITEM:
      console.log(action.payload)
      let desID = action.payload.id;
      let foundIndex = state.cart.findIndex(item => item.id === desID);
      newCart = [...state.cart];
      newCart[foundIndex] = action.payload;
      return {
        ...state,
        cart: newCart,
        totalPrice: getCartPrice(newCart)
      };

    case types.DELECT_CART_ITEM:
      // action.payload: {id: number}
      newCart = state.cart.filter(item => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        cart: newCart,
        totalItems: getCartSize(newCart),
        totalPrice: getCartPrice(newCart)
      };

    case types.CHECK_OUT_USER:
      // Empty user cart
      return {
        ...state,
        cart: [],
        totalItems: 0,
        totalPrice: 0
      };

    default:
      return state;
  }
};

export default cartReducer;
