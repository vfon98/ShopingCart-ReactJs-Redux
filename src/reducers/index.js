import { combineReducers } from 'redux';
import categoriesReducer from './categories.reducer';
import productsReducer from './products.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
    categoriesReducer,
    productsReducer,
    cartReducer,
    userReducer
});

export default rootReducer;