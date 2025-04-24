import { combineReducers } from "@reduxjs/toolkit";
import  productSlice  from "./productReducer";

const rootReducer = combineReducers({
  products: productSlice,

});

export default rootReducer;
