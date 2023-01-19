import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  value: UserType;
}

type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

const initialState: UserState = {
  value: {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    createdAt: '',
    updatedAt: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload;
    },
  },
});

export const { assignUser } = userSlice.actions;

export default userSlice.reducer;
