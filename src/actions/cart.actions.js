import axios from "../axios/axios.base";
import * as types from "../constants/actionTypes";
import {
  VIEW_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CART_PAYMENT
} from "../api/endpoints";

export const fetchCart = token => {
  return dispatch => {
    axios
      .get(VIEW_CART, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        dispatch({
          type: types.FETCH_CART_FROM_API,
          payload: { cart: res.data }
        });
      })
      .catch(console.log);
  };
};

export const getCartFromLocalStorage = userID => {
  let userCart = localStorage.getItem("user-cart");
  let payload = {
    userID: userID,
    // Return [] instead of null if userCart is not found
    cart: JSON.parse(userCart) || []
  };
  return {
    type: types.GET_CART_FROM_STORAGE,
    payload: payload
  };
};

export const addToCart = (token, productID) => {
  const data = {
    product: productID,
    amount: 1
  };
  return dispatch => {
    axios
      .post(ADD_TO_CART, data, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        dispatch({
          type: types.ADD_TO_CART,
          payload: { cart: res.data }
        });
      })
      .catch(console.log);
  };
};

export const addExistedItem = item => {
  // Solution: dispatch to reducer first, then get the value from reducer and update in the API
  return (dispatch, getState) => {
    let itemID = item.id;
    let currentItem = getState().cartReducer.cart.find(
      item => item.id === itemID
    );

    let newQuantity = currentItem.quantity + 1;
    dispatch(udpateCartItem({ ...item, quantity: newQuantity }));
  };
};

export const udpateCartItem = (token, productID, quantity) => {
  const data = { product: productID, amount: parseInt(quantity) };
  console.log(token, data);
  return dispatch => {
    axios
      .post(UPDATE_CART, data, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        console.log("Updating from API");
        dispatch({
          type: types.UPDATE_CART_ITEM,
          payload: { cart: res.data }
        });
      })
      .catch(console.log);
  };
};

export const deleteCartItem = (token, productID) => {
  const data = { product: productID };
  return dispatch => {
    axios
      .post(REMOVE_FROM_CART, data, {
        headers: { Authorization: `JWT ${token}` }
      })
      .then(res => {
        console.log("Deleting from API");
        dispatch({
          type: types.DELETE_CART_ITEM,
          payload: { cart: res.data }
        });
      })
      .catch(console.log);
  };
};

export const clearCart = token => {
  return dispatch => {
    axios
      .get(CLEAR_CART, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        dispatch({
          type: types.CLEAR_CART,
          payload: { cart: res.data }
        });
      })
      .catch(console.log);
  };
};

export const checkoutCart = (token, stripe_token) => {
  // 1 mean recurring payment, 2 mean one one-time payment
  const data = { option: 2, token: stripe_token };
  return async dispatch => {
    axios
      .post(CART_PAYMENT, data, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        dispatch({ type: types.CHECK_OUT_OK });
        return Promise.resolve();
      })
      .catch(err => {
        console.log({err});
        dispatch({ type: types.CHECK_OUT_FAILED });
        return Promise.reject(err);
      });
  };
};

export const updateCartInLocalStorage = cart => {
  localStorage.setItem("user-cart", JSON.stringify(cart));
};
