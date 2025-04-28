import { combineReducers } from "@reduxjs/toolkit";
import  productSlice  from "./productReducer";
import  categorySlice from "./categoryReducer";

const rootReducer = combineReducers({
  products: productSlice,
  categories: categorySlice,

});

export default rootReducer;
