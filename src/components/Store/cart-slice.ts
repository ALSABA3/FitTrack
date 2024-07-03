import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  description: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          image: newItem.image,
          title: newItem.title,
          price: newItem.price,
          description: newItem.description,
          quantity: newItem.quantity,
          totalPrice: newItem.totalPrice,
        });
        state.totalQuantity++;
        state.totalAmount = parseFloat(
          (state.totalAmount + newItem.price).toFixed(2)
        );
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalQuantity++;
        state.totalAmount = parseFloat(
          (state.totalAmount + newItem.price).toFixed(2)
        );
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) {
        state.totalQuantity--;
        state.totalAmount = parseFloat(
          (state.totalAmount - existingItem.price).toFixed(2)
        );
      }
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
        state.totalAmount = parseFloat(
          (state.totalAmount - existingItem.price).toFixed(2)
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalAmount = parseFloat(
          (state.totalAmount - existingItem.price).toFixed(2)
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
