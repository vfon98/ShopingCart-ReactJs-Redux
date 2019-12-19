import axios from "../axios/axios.base";
import * as types from "../constants/actionTypes";
import passwordHash from "password-hash";

// Fetch all products from mock API
export const fetchProducts = () => {
  return dispatch => {
    axios.get("/products").then(res => {
      dispatch({
        type: types.FETCH_PRODUCTS,
        payload: res.data
      });

      dispatch({
        type: types.ASSIGN_CATEGORIES,
        payload: getCategoriesFromProductsList(res.data)
      });
    });
  };
};

const getCategoriesFromProductsList = productsList => {
  let categoriesName = [];
  productsList.forEach(product => categoriesName.push(product.category));
  let uniqueCategoriesName = [...new Set(categoriesName)];
  // Simple add id attribute for each element
  return uniqueCategoriesName.map((name, index) => ({
    id: index,
    name: name
  }));
};

export const changeSelectedCategory = id => {
  return {
    type: types.CHANGE_SELECTED_CATEGORY,
    payload: id
  };
};

export const filterByCategory = category => {
  return {
    type: types.FILTER_BY_CATEGORY,
    payload: category
  };
};

export const fetchCartFromAPI = userID => {
  return dispatch => {
    axios.get("/user-cart").then(res => {
      dispatch({
        type: types.FETCH_CART_FROM_API,
        payload: {
          userID,
          cart: res.data
        }
      });
    });
  };
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
      .then(() => console.log("Updating from API"))
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
      .then(() => console.log("Deleting from API"))
      .catch(err => console.log(err));
    dispatch({
      type: types.DELECT_CART_ITEM,
      payload: id
    });
  };
};

export const registerAccount = account => {
  let hashedPassword = passwordHash.generate(account.password);

  return dispatch => {
    axios
      .post("/user-account", { ...account, password: hashedPassword })
      .then(res => {
        console.log("Registering account");
      })
      .catch(err => {
        console.log(err);
      });
    dispatch({
      type: types.REGISTER_ACCOUNT
    });
  };
};

export const loginAccount = account => {
  console.log(account);
  return dispatch => {
    axios
      // Authenticate by get request. Stupid way but no choices
      .get("/user-account", {
        params: {
          filter: account.username
        }
      })
      .then(res => {
        if (passwordHash.verify(account.password, res.data[0].password)) {
          console.log("Login successfull");
          let userInfo = { ...res.data[0], username: account.username };
          delete userInfo.password;
          sessionStorage.setItem("login-info", JSON.stringify(userInfo));
          dispatch({
            type: types.LOGIN_OK,
            payload: userInfo
          });
        } else {
          console.log("Login failed");
          dispatch({
            type: types.LOGIN_FAILED
          });
        }
      });
  };
};

export const logout = () => {
  sessionStorage.getItem("login-info") &&
    sessionStorage.removeItem("login-info");
  return {
    type: types.LOGOUT
  };
};

export const checkLogin = () => {
  let userSession = sessionStorage.getItem("login-info");
  if (sessionStorage && userSession) {
    let userInfo = JSON.parse(userSession);
    return {
      type: types.LOGIN_OK,
      payload: userInfo
    };
  }
  return {
    type: types.SESSION_NOT_FOUND
  };
};

export const checkOutUser = userID => {
  return (dispatch, getState) => {
    const { cart } = getState().cartReducer;
    cart.forEach(item => {
      dispatch(deleteCartItem(item.id));
    });
  };
};

export const assignCategories = categories => {
  return {
    type: types.ASSIGN_CATEGORIES,
    payload: categories
  };
};
