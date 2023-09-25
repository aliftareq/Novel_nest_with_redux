import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IBookFilter = {
  status: boolean;
  priceRange: number;
};
const initialState: IBookFilter = {
  status: false,
  priceRange: 150,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleState, setPriceRange } = bookSlice.actions;

export default bookSlice.reducer;
