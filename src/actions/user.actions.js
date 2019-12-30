import * as types from '../constants/actionTypes';
import * as UserAPI from '../api/user.api';

export const getUserProfile = token => {
  return dispatch => {
    UserAPI.getUserProfile(token)
      .then(res => {
        console.log('USER', res);
        dispatch({
          type: types.GET_USER_PROFILE,
          payload: { profile: res.data }
        });
      })
      .catch(err => console.log({ err }));
  };
};

export const udpateProfile = (token, { firstName, lastName, city }) => {
  const newProfile = {
    first_name: firstName,
    last_name: lastName,
    city
  };
  return dispatch => {
    UserAPI.updateProfile(token, newProfile).then(res => {
      dispatch({
        type: types.UPDATE_PROFILE
      });
      dispatch(getUserProfile(token));
    });
  };
};
