import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IBookFilter = {
  status: boolean;
  PublicationDate: number;
  Genre: string | null;
};
const initialState: IBookFilter = {
  status: false,
  PublicationDate: 1971,
  Genre: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPublicationDate: (state, action: PayloadAction<number>) => {
      state.PublicationDate = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.Genre = action.payload;
    },
  },
});

export const { toggleState, setPublicationDate, setGenre } = bookSlice.actions;

export default bookSlice.reducer;
