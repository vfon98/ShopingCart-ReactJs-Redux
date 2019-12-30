export const category = {
  CATEGORY_LIST: '/api/category/list'
};

export const product = {
  SEARCH_CATEGORY: '/api/category/search/?order_by=-id',
  PRODUCTS_LIST: '/api/products/list',
  PRODUCT_DETAIL: id => `/api/products/${id}/details`
};

export const auth = {
  REGISTER: '/api/auth/register',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout'
};
export const user = {
  USER_PROFILE: '/api/auth/profile',
  UPDATE_PROFILE: '/api/auth/profile',
};

export const cart = {
  VIEW_CART: '/api/user/cart/view-cart',
  ADD_TO_CART: '/api/user/cart/add-to-cart',
  UPDATE_CART: '/api/user/cart/update-cart',
  REMOVE_FROM_CART: '/api/user/cart/remove-from-cart',
  CLEAR_CART: '/api/user/cart/clear',
  CART_PAYMENT: '/api/user/cart/payment'
};
