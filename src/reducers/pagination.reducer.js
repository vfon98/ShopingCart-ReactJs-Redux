import * as types from "../constants/actionTypes";

const initialState = {
  currentPage: 1,
  pageSize: 20,
  count: 0,
  totalPages: 0,
  next: null,
  previous: null
};

const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PAGINATION:
      const { page } = action.payload;
      return {
        ...state,
        count: page.count,
        totalPages: Math.ceil(page.count / state.pageSize),
        next: page.next,
        previous: page.previous,
      };

    case types.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      }

    case types.PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      }

    case types.GO_TO_PAGE:
      return {
        ...state,
        currentPage: action.payload.page_number
      }

    default:
      return state;
  }
};

export default paginationReducer;
