/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IBook } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ICart = {
  products: IBook[];
  BookState: boolean;
};
const initialState: ICart = {
  products: [],
  BookState: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IBook>) => {
      state.products.push({ ...action.payload });
    },
    removeFromCart: (state, action: PayloadAction<IBook>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    toggleBookState: (state, action: PayloadAction<IBook>) => {
      // Find the index of the book with the matching _id in the products array
      const index = state.products.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        // Create a copy of the book to modify its BookState property
        const updatedBook = { ...state.products[index] };

        // Toggle the BookState property
        updatedBook.BookState = !updatedBook.BookState;

        // Update the products array with the modified book
        state.products[index] = updatedBook;
      }
    },
  },
});

export const { addToCart, removeFromCart, toggleBookState } = cartSlice.actions;

export default cartSlice.reducer;
