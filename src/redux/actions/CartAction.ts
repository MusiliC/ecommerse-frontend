import { ProductType } from "@/types";
import { AppThunk } from "../store";
import { selectProductById } from "../reducers/productReducer";
import { addToCart } from "../reducers/cartReducer";
import toast from "react-hot-toast";

export const addToCartAction = (
  data: ProductType,
  qty = 1
): AppThunk<boolean> => {
  return (dispatch, getState) => {
    const getProduct = selectProductById(getState(), data.productId);

    let isQuantityExist = false;

    if (getProduct) {
      isQuantityExist = getProduct.quantity >= qty;
      if (isQuantityExist) {
        dispatch(
          addToCart(getProduct)
        );
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
