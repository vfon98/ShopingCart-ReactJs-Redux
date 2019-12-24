import * as types from '../constants/actionTypes'

const initialState = {
  token: null,
  isLogin: false,
  regiterSuccess: null,
  registerError: null,
  loginError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_OK:
      return {
        ...state,
        registerSuccess: action.payload.success
      }

    case types.REGISTER_FAILED:
      return {
        ...state,
        registerError: action.payload.error
      }

    case types.LOGIN_OK:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token
      }

    case types.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload.error
      }

    default:
      return state;
  }
}

export default authReducer;