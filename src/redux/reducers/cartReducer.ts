import { cartItemType, cartState, ProductType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createUserCart, fetchUserCart } from "../actions/CartAction";

const cartItemsString = localStorage.getItem("cartItems");
const cartItems: cartItemType[] = cartItemsString
  ? JSON.parse(cartItemsString).map((item: ProductType) =>
      "item" in item ? item : { item: item, quantity: item.quantity || 1 }
    )
  : [];
const initialState: cartState = {
  cart: cartItems,
  totalPrice: calculateTotalPrice(cartItems),
  totalItems: calculateTotalItems(cartItems), // Initialize totalItems
  cartId: null,
  isLoading: false,
  error: null,
  success: false,
};

interface AddToCartPayload {
  product: ProductType;
  quantity: number;
}

function calculateTotalPrice(items: cartItemType[]): number {
  return items.reduce((total, cartItem) => {
    const { item, quantity } = cartItem;
    if (typeof item.price !== "number" || typeof quantity !== "number") {
      return total;
    }
    const priceToUse =
      typeof item.specialPrice === "number" && item.specialPrice > 0
        ? item.specialPrice
        : item.price;
    return total + priceToUse * quantity;
  }, 0);
}

function calculateTotalItems(items: cartItemType[]): number {
  return items.reduce((total, cartItem) => {
    if (typeof cartItem.quantity !== "number") {
      return total;
    }
    return total + cartItem.quantity;
  }, 0);
}

const saveCartToStorage = (items: cartItemType[]) => {
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
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.item.productId === product.productId
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.cart = state.cart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add new item
        state.cart = [...state.cart, { item: product, quantity }];
      }

      saveCartToStorage(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const cartItem = state.cart.find(
        (cartItem) => cartItem.item.productId === productId
      );

      if (cartItem) {
        cartItem.quantity += 1;
        saveCartToStorage(state.cart);
        state.totalPrice = calculateTotalPrice(state.cart);
        state.totalItems = calculateTotalItems(state.cart);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const cartItem = state.cart.find(
        (cartItem) => cartItem.item.productId === productId
      );

      if (cartItem) {
        cartItem.quantity -= 1;
        saveCartToStorage(state.cart);
        state.totalPrice = calculateTotalPrice(state.cart);
        state.totalItems = calculateTotalItems(state.cart);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.cart = state.cart.filter(
        (cartItem) => cartItem.item.productId !== productId
      );
      saveCartToStorage(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserCart.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
     
      })
      .addCase(createUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Unknown error occurred";
      });
      builder
        .addCase(fetchUserCart.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchUserCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true;
          // Transform the API response to match cartItemType
          const { products, cartId, totalPrice } = action.payload;
          console.log(action.payload);

          state.cart = products.map((product: ProductType) => ({
            item: {
              productId: product.productId,
              productName: product.productName,
              description: product.description,
              image: product.image,
              price: product.price, // Adjust based on your ProductType
              specialPrice: product.specialPrice, // If applicable
              // Add other fields as needed
            },
            quantity: product.quantity,
          }));
          state.cartId = cartId;
          state.totalPrice = totalPrice;
          state.totalItems = calculateTotalItems(state.cart);
          console.log(state.cart);

          saveCartToStorage(state.cart);
        })
        .addCase(fetchUserCart.rejected, (state, action) => {
          state.isLoading = false;
          state.error = (action.payload as string) || "Unknown error occurred";
        });
  },
});

export const { addToCart, increaseQuantity, removeFromCart, decreaseQuantity } =
  cartSlice.actions;

export const selectCartItems = (state: RootState): cartItemType[] =>
  state.cart.cart;

export const selectTotalCartItems = (state: RootState): number =>
  state.cart.totalItems;

export default cartSlice.reducer;
