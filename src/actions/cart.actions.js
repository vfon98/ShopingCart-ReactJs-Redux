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
    // GET DATA FROM LOCAL STORAGE FIRST
    dispatch({
      type: types.FETCH_CART,
      payload: { cart: getCartFromLocalStorage() }
    });

    getCartFromLocalStorage();
    axios
      .get(VIEW_CART, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        dispatch({
          type: types.FETCH_CART,
          payload: { cart: res.data }
        });
        updateCartInLocalStorage(res.data);
      })
      .catch(console.log);
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

export const udpateCartItem = (token, productID, quantity) => {
  const data = { product: productID, amount: parseInt(quantity) };
  console.log(token, data);
  return dispatch => {
    axios
      .post(UPDATE_CART, data, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        console.log("Updated from API");
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
    await axios
      .post(CART_PAYMENT, data, { headers: { Authorization: `JWT ${token}` } })
      .then(res => {
        dispatch({ type: types.CHECK_OUT_OK });
        return Promise.resolve();
      })
      .catch(err => {
        console.log({ err });
        dispatch({ type: types.CHECK_OUT_FAILED });
        return Promise.reject(err);
      });
  };
};

export const getCartFromLocalStorage = () => {
  // Return [] instead of null
  return JSON.parse(localStorage.getItem("user-cart")) || [];
};

export const updateCartInLocalStorage = cart => {
  localStorage.setItem('user-cart', JSON.stringify(cart))
};
