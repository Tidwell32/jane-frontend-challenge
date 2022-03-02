import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartProduct } from "../types/CartProduct";

interface CartState {
  products: CartProduct[];
}

const initialState = { products: [] };

const slice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartProduct>): void {
      state.products = [...state.products, action.payload];
    },
    removeFromCart(state: CartState, action: PayloadAction<number>): void {
      state.products = state.products.filter((product) => product.productId !== action.payload);
    },
    updateQuantity(state: CartState, action: PayloadAction<{ productId: number; quantity: number }>): void {
      const { productId, quantity } = action.payload;
      state.products = state.products.map((product) =>
        product.productId === productId ? { ...product, quantity } : product
      );
    },
    emptyCart(state: CartState): void {
      state.products = [];
    },
  },
});

export const { reducer } = slice;
export const { addToCart, removeFromCart, updateQuantity, emptyCart } = slice.actions;
