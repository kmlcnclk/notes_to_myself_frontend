import { configureStore } from '@reduxjs/toolkit';
import firstNameReducer from './slicers/firstName.slice';

export const store = configureStore({
  reducer: {
    firstName: firstNameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
