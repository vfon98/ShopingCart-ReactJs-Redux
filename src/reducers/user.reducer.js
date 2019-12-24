import * as types from "../constants/actionTypes";

const initialState = {
  isLogin: null,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  stripeID: null,
  city: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PROFILE:
      let profile = action.payload.profile;
      return {
        ...state,
        isLogin: true,
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        username: profile.username,
        stripeID: profile.stripe_customer_id,
        city: profile.city
      }

    default:
      return state;
  }
};

export default userReducer;