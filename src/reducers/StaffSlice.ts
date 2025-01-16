import { createSlice } from "@reduxjs/toolkit";

const initialState = { staff: [] };

const StaffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    addStaff: (state, action) => {
      state.staff.push(action.payload);
    },
    updateStaff: (state, action) => {
      const index = state.staff.findIndex((staff) => staff.id === action.payload.id);
      if (index !== -1) {
        state.staff[index] = {
          ...state.staff[index],
          ...action.payload, // Merge the updates
        };
      }
    },
  },
});

export const { addStaff, updateStaff } = StaffSlice.actions;
export default StaffSlice.reducer;
