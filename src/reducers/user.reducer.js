import * as types from "../constants/actionTypes";

const initialState = {
  isLogin: null,
  userID: null,
  username: null,
  address: null,
  created_at: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_OK:
      let userInfo = action.payload;
      return {
        isLogin: true,
        userID: userInfo.id,
        username: userInfo.username,
        address: userInfo.address,
        created_at: userInfo.created_at
      };
    case types.LOGIN_FAILED:
      return {
        isLogin: false
      };
    case types.LOGOUT:
      return {
          state: initialState
      };
    default:
      return state;
  }
};

export default userReducer;