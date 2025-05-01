import { cartItemType, ProductType } from "@/types";
import { AppThunk } from "../store";
import { selectProductById } from "../reducers/productReducer";
import { addToCart, increaseQuantity } from "../reducers/cartReducer";
import toast from "react-hot-toast";

export const addToCartAction = (
  data: ProductType,
  qty = 1
): AppThunk<boolean> => {
  return (dispatch, getState) => {
    const getProduct = selectProductById(getState(), data.productId);

    let isQuantityExist = false;

    if (getProduct) {
      isQuantityExist = getProduct.quantity >= qty; // Check stock quantity
      if (isQuantityExist) {
        dispatch(addToCart({ product: getProduct, quantity: qty }));
        toast.success("Added to cart");
      } else {
        toast.error("Insufficient quantity");
      }
    } else {
      toast.error("Product not found");
    }

    return isQuantityExist;
  };
};

export const increaseCartQuantity = (productId: number): AppThunk<boolean> => {
  return (dispatch, getState) => {      
    
    const getProduct = selectProductById(getState(), productId);
    const cart = getState().cart.cart; // Assuming cartReducer is mounted under 'cart'
    const cartItem = cart.find(
      (item: cartItemType) => item.item.productId === productId
    );

    let isQuantityValid = false;

    if (!getProduct) {
      toast.error("Product not found");
      return isQuantityValid;
    }

    if (!cartItem) {
      toast.error("Item not in cart");
      return isQuantityValid;
    }

    const newQuantity = cartItem.quantity + 1;
    isQuantityValid = getProduct.quantity >= newQuantity; // Check stock quantity

    if (isQuantityValid) {
      dispatch(increaseQuantity(productId));
      toast.success("Quantity increased");
    } else {
      toast.error("Insufficient stock");
    }

    return isQuantityValid;
  };
};