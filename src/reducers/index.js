import { combineReducers } from 'redux';
import categoriesReducer from './categories.reducer';
import productsReducer from './products.reducer';
import cartReducer from './cart.reducer';

const rootReducer = combineReducers({
    categoriesReducer,
    productsReducer,
    cartReducer
});

export default rootReducer;