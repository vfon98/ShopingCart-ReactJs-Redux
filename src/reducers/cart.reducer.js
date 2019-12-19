import * as types from "../constants/actionTypes";

const cart = [
  //   {
  //     id: -1,
  //     name: "Example image",
  //     image: "https://via.placeholder.com/250",
  //     price: 500.01,
  //     category: "Custom",
  //     quantity: 1
  //   },
  //   {
  //     id: -2,
  //     name: "Example image 2",
  //     image: "https://via.placeholder.com/250",
  //     price: 20.5,
  //     category: "Custom",
  //     quantity: 2
  //   }
];
const inintialState = {
  cart: [],
  totalItems: getCartSize(cart),
  totalPrice: getCartPrice(cart)
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
  switch (action.type) {
    case types.FETCH_CART_FROM_API:
      let userID = action.payload.userID;
      // Because mockAPI doesn't have filter function
      newCart = action.payload.cart.filter(item => item.userID === userID);
      return {
        ...state,
        cart: newCart,
        totalItems: getCartSize(newCart),
        totalPrice: getCartPrice(newCart)
      };

    case types.ADD_TO_CART:
      newCart = [...state.cart, action.payload];
      return {
        ...state,
        cart: newCart,
        totalItems: getCartSize(newCart),
        totalPrice: getCartPrice(newCart)
      };

    case types.UPDATE_CART_ITEM:
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
