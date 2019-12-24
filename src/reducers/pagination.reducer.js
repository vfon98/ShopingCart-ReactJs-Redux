const initialState = {
  currentPage: 4,
  pageSize: 20,
  totalItems: null,
  totalPages: null,
  preUrl: '',
  nextUrl: ''
}

const paginationReducer = (state = initialState, aciton) => {
  return state;
}

export default paginationReducer;