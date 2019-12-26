import * as types from "../constants/actionTypes";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  stripeID: null,
  city: null,
};

const userReducer = (state = initialState, action) => {
  if (action.payload && action.payload.profile) {
    // Transform data from API for shorter and reusable code
    var profile = action.payload.profile;
    var userProfile = {
      id: profile.id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      username: profile.username,
      stripeID: profile.stripe_customer_id,
      city: profile.city,
    }
  }

  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        ...userProfile
      }

    case types.GET_USER_PROFILE:
      return {
        ...state,
        ...userProfile
      }
    
    case types.LOGOUT:
      return {
        ...initialState
      }

    default:
      return state;
  }
};

export default userReducer;