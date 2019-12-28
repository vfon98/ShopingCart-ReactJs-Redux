import * as types from "../constants/actionTypes";
import * as UserAPI from "../api/user.api";

export const getUserProfile = token => {
  return dispatch => {
    UserAPI.getUserProfile(token)
      .then(res => {
        console.log("USER", res);
        dispatch({
          type: types.GET_USER_PROFILE,
          payload: { profile: res.data }
        });
      })
      .catch(console.log);
  };
};
