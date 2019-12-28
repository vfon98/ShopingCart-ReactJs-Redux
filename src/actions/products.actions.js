import * as types from '../constants/actionTypes';
import * as ProductAPI from '../api/product.api';

// Search dispatch the same action
export const searchByCategory = category => {
  return (dispatch, getState) => {
    dispatch({ type: types.PRODUCT_PENDING });

    const { currentPage, pageSize } = getState().paginationReducer;
    ProductAPI.searchByCategory(category, currentPage, pageSize)
      .then(res => {
        dispatch({
          type: types.SEARCH_PRODUCTS,
          payload: res.data.results
        });

        dispatch({
          type: types.CREATE_PAGINATION,
          payload: { page: res.data }
        });
      })
      .catch(err => console.log({ err }));
  };
};

export const detailProduct = id => {
  return dispatch => {
    dispatch({ type: types.PRODUCT_PENDING });
    ProductAPI.detailProduct(id).then(res => {
      dispatch({
        type: types.DETAIL_PRODUCT,
        payload: { details: res.data }
      });
    });
  };
};
