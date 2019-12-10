import { combineReducers } from 'redux';
import cardReducer from './cardReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({ cards: cardReducer, categories: categoryReducer });
