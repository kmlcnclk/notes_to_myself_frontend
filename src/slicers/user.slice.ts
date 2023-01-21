import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  value: UserType;
}

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type UserSomePropertiesType = {
  email: string;
  firstName: string;
  lastName: string;
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
    assignSomeProperties: (
      state,
      action: PayloadAction<UserSomePropertiesType>
    ) => {
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
      state.value.email = action.payload.email;
    },
    deleteUser: (state) => {
      state.value = {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        createdAt: '',
        updatedAt: '',
      };
    },
  },
});

export const { assignUser, deleteUser, assignSomeProperties } =
  userSlice.actions;

export default userSlice.reducer;
