import * as types from '../constants/actionTypes';
import * as UserAPI from '../api/user.api';
import * as AuthAPI from '../api/auth.api';
import { getUserProfile } from './user.actions';

export const authUser = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { type: types.TOKEN_NOT_FOUND };
  }
  return dispatch => {
    UserAPI.getUserProfile(token)
      .then(res => {
        dispatch({
          type: types.AUTH_USER,
          payload: { profile: res.data, token }
        });
      })
      .catch(err => {
        console.log({ err });
        dispatch({ type: types.TOKEN_EXPIRED });
        removeTokenFromLocalStorage();
      });
  };
};

export const registerAccount = accountInfo => {
  return dispatch => {
    AuthAPI.registerAccount(accountInfo)
      .then(res => {
        dispatch({
          type: types.REGISTER_OK,
          payload: { success: res.data } // {id: string, email: string}
        });
      })
      .catch(err => {
        console.log(err.response.data);
        // Existed mail or password not match
        dispatch({
          type: types.REGISTER_FAILED,
          payload: { error: err.response.data }
        });
      });
  };
};

export const login = (email, password) => {
  return dispatch => {
    AuthAPI.login(email, password)
      .then(res => {
        dispatch({
          type: types.LOGIN_OK,
          payload: { token: res.data.token }
        });
        saveTokenIntoLocalStorage(res.data.token);
        dispatch(getUserProfile(res.data.token));
      })
      .catch(err => {
        dispatch({
          type: types.LOGIN_FAILED,
          payload: { error: err.response.data }
        });
      });
  };
};

export const logout = token => {
  return dispatch => {
    AuthAPI.logout(token)
      .then(res => {
        removeTokenFromLocalStorage();
        dispatch({
          type: types.LOGOUT
        });
      })
      .catch(console.log);
  };
};

export const updatePassword = (token, input) => {
  const body = {
    old_password: input.oldPassword,
    new_password: input.newPassword,
    confirm_password: input.confirmPassword
  };
  return dispatch => {
    AuthAPI.updatePassword(token, body)
      .then(res => {
        dispatch({ type: types.UPDATE_PASSWORD_OK });
      })
      .catch(err => {
        console.log({ err });
        dispatch({
          type: types.UPDATE_PASSWORD_FAILED,
          payload: { error: err.response.data }
        });
      });
  };
};

const removeTokenFromLocalStorage = () => {
  let token = localStorage.getItem('user-token');
  token && localStorage.removeItem('user-token');
};

const saveTokenIntoLocalStorage = token => {
  localStorage.setItem('user-token', token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('user-token');
};
