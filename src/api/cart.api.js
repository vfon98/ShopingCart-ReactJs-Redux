import axios from '../axios/axios.base';
import { cart } from './endpoints';

export const fetchCart = token => {
  return axios.get(cart.VIEW_CART, {
    headers: { Authorization: `JWT ${token}` }
  });
};

export const addToCart = (token, productID, amount) => {
  const body = {
    product: productID,
    amount
  };
  return axios.post(cart.ADD_TO_CART, body, {
    headers: { Authorization: `JWT ${token}` }
  });
};

export const updateCartItem = (token, productID, amount) => {
  const body = {
    product: productID,
    amount: parseInt(amount)
  };
  return axios.post(cart.UPDATE_CART, body, {
    headers: { Authorization: `JWT ${token}` }
  });
};

export const deleteCartItem = (token, productID) => {
  const body = { product: productID };
  return axios.post(cart.REMOVE_FROM_CART, body, {
    headers: { Authorization: `JWT ${token}` }
  });
};

export const clearCart = token => {
  return axios.get(cart.CLEAR_CART, {
    headers: { Authorization: `JWT ${token}` }
  });
};

export const checkoutCart = (token, stripe_token) => {
  // 1 mean recurring payment, 2 mean one one-time payment
  const body = { option: 2, token: stripe_token };
  return axios.post(cart.CART_PAYMENT, body, {
    headers: { Authorization: `JWT ${token}` }
  });
};
