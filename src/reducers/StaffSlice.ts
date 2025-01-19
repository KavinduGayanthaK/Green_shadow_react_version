import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StaffModel } from "@/models/StaffModel";

// Initial state for the slice
const initialState: { staff: StaffModel[] } = { staff: [] };

const StaffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    // Add a vehicle
    addStaff: (state, action: PayloadAction<StaffModel>) => {
      state.staff.push(action.payload);
    },
    // Update a vehicle
    updateStaff: (state, action: PayloadAction<StaffModel>) => {
      const index = state.staff.findIndex(
        (staff) =>
          staff.staffId === action.payload.staffId
      );
      if (index !== -1) {
        state.staff[index] = action.payload;
      }
    },
    //Delete vehicle
    deleteStaff: (state, action: PayloadAction<{ staffId: string }>) => {
        state.staff = state.staff.filter(
          (staff) => staff.staffId !== action.payload.staffId
        );
      },
      
  },
});

export const { addStaff, updateStaff,deleteStaff } = StaffSlice.actions;
export default StaffSlice.reducer;
