import * as types from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  currentSelected: {
    id: -1,
    name: "All"
  },
  categories: [{ id: -1, name: "All" }]
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        categories: [...initialState.categories, ...action.payload]
      };

    case types.CHANGE_SELECTED_CATEGORY:
      return {
        ...state,
        currentSelected: action.payload.category
      };

    default:
      return state;
  }
};

export default categoriesReducer;
