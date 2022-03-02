import { reducer as shoppingCartReducer } from "../slices/shoppingCart";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ shoppingCart: shoppingCartReducer });

export default rootReducer;
