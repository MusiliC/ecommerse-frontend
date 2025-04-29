import { ProductType } from "@/types";
import { AppThunk } from "../store";
import { selectProductById } from "../reducers/productReducer";
import { addToCart } from "../reducers/cartReducer";

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
          addToCart({
            productId: getProduct.productId,
            quantity: qty,
            price: getProduct.specialPrice || getProduct.price, 
            productName: getProduct.productName,
          })
        );
      } else {
        console.error("Insufficient quantity");
      }
    } else {
      console.error("Product not found");
    }

    return isQuantityExist;
  };
};
