import {  cartState, ProductType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const cartItemsString = localStorage.getItem("cartItems");
const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

const initialState: cartState = {
  cart: cartItems, // Use the cartItems from localStorage
  totalPrice: calculateTotalPrice(cartItems), // You might want to calculate this
  cartId: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculateTotalPrice(items: any[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

const saveCartToStorage = (items: ProductType[]) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: {
        payload: ProductType;
      }
    ) => {
      const productToAdd = action.payload;

      const existingItemIndex = state.cart.findIndex(
        (item:ProductType) => item.productId === productToAdd.productId
      );

      if (existingItemIndex >= 0) {
        state.cart = state.cart.map((item: ProductType) =>
          item.productId === productToAdd.productId ? productToAdd : item
        );
      } else {
        state.cart = [...state.cart, productToAdd];
      }

      // Save cart to storage after updating state
      saveCartToStorage(state.cart);

      // Optionally update totalPrice if needed
      // state.totalPrice = calculateTotalPrice(state.cart);

      return state; // Return the updated state
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
