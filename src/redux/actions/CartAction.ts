import { cartItemType, ProductType } from "@/types";
import { AppThunk } from "../store";
import { selectProductById } from "../reducers/productReducer";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../reducers/cartReducer";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";

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

export const decreaseQuantityAction = (
  productId: number
): AppThunk<boolean> => {
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

    isQuantityValid = cartItem.quantity > 1;

    if (isQuantityValid) {
      dispatch(decreaseQuantity(productId));
      toast.success("Quantity decreased");
    } else {
      toast.error("Minimum quantity is 1");
    }

    return isQuantityValid;
  };
};

export const removeFromCartAction = (productId: number): AppThunk<void> => {
  return (dispatch) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };
};

export const createUserCart = createAsyncThunk(
  "cart/createUserCart",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/carts/create", data);

      await thunkAPI.dispatch(fetchUserCart()).unwrap();
      toast.success("Cart created/updated successfully");
      return response?.data;
    } catch (error: unknown) {
      const parsedError = handleApiError(error);

      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/carts/users/cart");
      if (!response?.data?.data) {
        throw new Error("No cart data found in response");
      }
      return response?.data?.data;
    } catch (error: unknown) {
      const parsedError = handleApiError(error);
      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);


export const createStripePaymentSecret = createAsyncThunk(
  "cart/createStripePaymentSecret",
  async (totalPrice : number, thunkAPI) => {
    try {
      const response = await api.post("/orders/stripe-client-secret", {
        amount: totalPrice,
        currency: "usd",
      });

      await thunkAPI.dispatch(fetchUserCart()).unwrap();
      toast.success("Success");
      return response?.data;
    } catch (error: unknown) {
      const parsedError = handleApiError(error);

      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);

interface PaymentConfirmData {
  addressId: number;
  pgName: string;
  pgPaymentId: string;
  pgStatus: string;
  pgResponseMessage: string;
}

export const stripePaymentConfirm = createAsyncThunk(
  "cart/stripePaymentConfirm",
  async (data: PaymentConfirmData, thunkAPI) => {
    try {
      const response = await api.post("/orders/users/payments/online", data);

      if (response.data) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("clientSecret");
      }
      toast.success("Success");
      return response?.data;
    } catch (error: unknown) {
      const parsedError = handleApiError(error);

      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);