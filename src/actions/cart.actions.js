import axios from '../axios/axios.base';
import * as types from '../constants/actionTypes'

export const fetchCartFromAPI = userID => {
  return dispatch => {
    dispatch(getCartFromLocalStorage(userID));
    axios.get("/user-cart").then(res => {
      dispatch({
        type: types.FETCH_CART_FROM_API,
        payload: {
          userID,
          cart: res.data
        }
      });
      updateCartInLocalStorage(res.data);
    });
  };
};

const getCartFromLocalStorage = userID => {
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

export const updateCartInLocalStorage = cart => {
  localStorage.setItem("user-cart", JSON.stringify(cart));
};

export const addToCart = item => {
  return dispatch => {
    axios
      .post("/user-cart", { ...item })
      .then(res => {
        console.log("Posting to API");
      })
      .catch(err => console.log(err));
    dispatch({
      type: types.ADD_TO_CART,
      payload: item
    });
  };
};

export const udpateCartItem = item => {
  return dispatch => {
    axios
      .put(`/user-cart/${item.id}`, { ...item })
      .then(res => {
        console.log("Updating from API");
      })
      .catch(err => console.log(err));
    dispatch({
      type: types.UPDATE_CART_ITEM,
      payload: item
    });
  };
};

export const deleteCartItem = id => {
  return dispatch => {
    axios
      .delete(`/user-cart/${id}`)
      .then(res => {
        console.log("Deleting from API");
      })
      .catch(err => console.log(err));
    dispatch({
      type: types.DELECT_CART_ITEM,
      payload: id
    });
  };
};