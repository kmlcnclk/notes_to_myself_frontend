import { configureStore } from '@reduxjs/toolkit';
import firstNameReducer from './slicers/firstName.slice';
import userReducer from './slicers/user.slice';

export const store = configureStore({
  reducer: {
    firstName: firstNameReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
