import * as types from '../constants/actionTypes';
import * as CartAPI from '../api/cart.api';

export const fetchCart = token => {
  return dispatch => {
    // GET DATA FROM LOCAL STORAGE FIRST
    dispatch({
      type: types.FETCH_CART,
      payload: { cart: getCartFromLocalStorage() }
    });

    getCartFromLocalStorage();
    CartAPI.fetchCart(token)
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

export const addToCart = (token, productID, amount = 1) => {
  return dispatch => {
    dispatch({ type: types.CART_PENDING });
    CartAPI.addToCart(token, productID, amount)
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
  return dispatch => {
    dispatch({ type: types.CART_PENDING })
    CartAPI.updateCartItem(token, productID, quantity)
      .then(res => {
        console.log('Updated from API');
        dispatch({
          type: types.UPDATE_CART_ITEM,
          payload: { cart: res.data }
        });
      })
      .catch(console.log);
  };
};

export const deleteCartItem = (token, productID) => {
  return dispatch => {
    dispatch({ type: types.CART_PENDING })
    CartAPI.deleteCartItem(token, productID)
      .then(res => {
        console.log('Deleting from API');
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
    dispatch({ type: types.CART_PENDING })
    CartAPI.clearCart(token)
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
  return async dispatch => {
    CartAPI.clearCart(token, stripe_token)
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
  return JSON.parse(localStorage.getItem('user-cart')) || [];
};

export const updateCartInLocalStorage = cart => {
  localStorage.setItem('user-cart', JSON.stringify(cart));
};
