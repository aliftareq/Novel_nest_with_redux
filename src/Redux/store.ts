import { configureStore } from '@reduxjs/toolkit';
import { Api } from './Api/apiSlice';
import userReducer from './Features/user/userSlice';
import bookReducer from './Features/Books/bookSlice';
import wishListReducer from './Features/wishlist/wishListSlice';

const store = configureStore({
  reducer: {
    cart: wishListReducer,
    bookFilter: bookReducer,
    user: userReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
