import * as types from '../constants/actionTypes';

const categories = [
  {
    id: 0,
    name: "All"
  },
  {
    id: 1,
    name: "Smartphone"
  },
  {
    id: 2,
    name: "Laptop"
  },
  {
    id: 3,
    name: "Headphone"
  },
  {
    id: 4,
    name: "Glasses"
  },
  {
    id: 5,
    name: "Watch"
  },
  {
    id: 6,
    name: "Belt"
  }
];
const initialState = {
  currentSelected: {
    id: 0,
    name: "All"
  },
  categories: categories
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SELECTED_CATEGORY:
      let currentSelected = state.categories.find(cate => cate.id === action.payload);
      return {
        ...state,
        currentSelected: currentSelected
      } 
    default:
      return state;
  }
};

export default categoriesReducer;
