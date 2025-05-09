import authSlice  from './AuthReducer';
import { combineReducers } from "@reduxjs/toolkit";
import  productSlice  from "./productReducer";
import  categorySlice from "./categoryReducer";
import  cartSlice  from "./cartReducer";
import addressSlice from './AddressReducer';


const rootReducer = combineReducers({
  products: productSlice,
  categories: categorySlice,
  cart: cartSlice,
  auth: authSlice,
  address: addressSlice

});

export default rootReducer;
