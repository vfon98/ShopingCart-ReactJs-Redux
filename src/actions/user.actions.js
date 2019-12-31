import * as types from '../constants/actionTypes';
import * as UserAPI from '../api/user.api';

export const getUserProfile = token => {
  return dispatch => {
    UserAPI.getUserProfile(token)
      .then(res => {
        dispatch({
          type: types.GET_USER_PROFILE,
          payload: { profile: res.data }
        });
      })
      .catch(err => console.log({ err }));
  };
};

export const updateProfile = (token, oldProfile) => {
  const newProfile = {
    first_name: oldProfile.firstName,
    last_name: oldProfile.lastName,
    city: oldProfile.city
  };
  return async dispatch => {
    await UserAPI.updateProfile(token, newProfile)
      .then(res => {
        dispatch({
          type: types.UPDATE_PROFILE
        });
        dispatch(getUserProfile(token));
        Promise.resolve(res);
      })
      .catch(err => console.log({ err }));
  };
};
