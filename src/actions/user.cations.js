import axios from '../axios/axios.base';
import passwordHash from 'password-hash';
import * as types from '../constants/actionTypes';
import { deleteCartItem } from './cart.actions'

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