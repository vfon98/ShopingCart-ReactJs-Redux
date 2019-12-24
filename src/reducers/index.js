import { combineReducers } from 'redux';
import categoriesReducer from './categories.reducer';
import productsReducer from './products.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import pagination from './pagination.reducer'
import authReducer from './auth.reducer'

const rootReducer = combineReducers({
    categoriesReducer,
    productsReducer,
    cartReducer,
    userReducer,
    pagination,
    authReducer
});

export default rootReducer;