import { REGISTER, LOGIN, LOGOUT } from "../api/endpoints";
import axios from "../axios/axios.base";
import * as types from "../constants/actionTypes";
import { getUserProfile } from './user.actions'

export const registerAccount = accountInfo => {
  return dispatch => {
    axios
      .post(REGISTER, accountInfo)
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
    axios
      .post(LOGIN, { email, password })
      .then(res => {
        dispatch({
          type: types.LOGIN_OK,
          payload: { token: res.data.token }
        });
        // axios.defaults.headers.common['Authorization'] = `JWT ${res.data.token}`;
        saveTokenIntoLocalStorage(res.data.token);
        dispatch(getUserProfile(res.data.token));
      })
      .catch(err => {
        dispatch({
          type: types.LOGIN_FAILED,
          payload: { error: err.response.data }
        })
      });
  };
};

const saveTokenIntoLocalStorage = token => {
  localStorage.setItem('user-token', token);
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('user-token');
}