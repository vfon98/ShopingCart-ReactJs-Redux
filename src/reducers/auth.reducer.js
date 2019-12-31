import * as types from "../constants/actionTypes";

const initialState = {
  isAuthPending: false,
  isPasswordUpdated: false,
  token: null,
  isLogin: null,
  regiterSuccess: null,
  registerError: null,
  loginError: null,
  passwordError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        token: action.payload.token,
        isLogin: true
      };

    case types.REGISTER_OK:
      return {
        ...state,
        registerSuccess: action.payload.success
      };

    case types.REGISTER_FAILED:
      return {
        ...state,
        registerError: action.payload.error
      };

    case types.LOGIN_OK:
      return {
        ...state,
        isAuthPending: false,
        isPasswordUpdated: false,
        isLogin: true,
        token: action.payload.token
      };

    case types.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload.error
      };

    case types.LOGOUT:
      return { ...initialState };
    
    case types.UPDATE_PASSWORD_OK:
      return {
        ...state,
        isPasswordUpdated: true
      }

    case types.UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        passwordError: action.payload.error
      }

    case types.TOKEN_EXPIRED:
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
