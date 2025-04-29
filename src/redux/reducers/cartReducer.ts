import { CartItemType, cartState } from "@/types";
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

const saveCartToStorage = (items: CartItemType[]) => {
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
        payload: {
          productId: number;
          quantity: number;
          price: number;
          productName: string;
        };
      }
    ) => {
      const { productId, quantity, price, productName } = action.payload;

      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex >= 0) {
        // Update quantity
        state.cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.cart.push({ productId, quantity, price, productName });
      }

      // Update totalPrice
      state.totalPrice = calculateTotalPrice(state.cart);

      // Save to localStorage
      saveCartToStorage(state.cart);
    },
  },
});


export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
