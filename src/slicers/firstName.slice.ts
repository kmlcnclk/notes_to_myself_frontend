import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FirstNameState {
  value: string;
}

const initialState: FirstNameState = {
  value: '',
};

export const firstNameSlice = createSlice({
  name: 'firstName',
  initialState,
  reducers: {
    assignUserFirstName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { assignUserFirstName } = firstNameSlice.actions;

export default firstNameSlice.reducer;
