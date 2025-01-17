import { createSlice } from "@reduxjs/toolkit";

const initialState = { vehicle: [] };

const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: initialState,
  reducers: {
    addVehicle: (state, action) => {
      state.vehicle.push(action.payload);
    },
    updateVehicle: (state, action) => {
      const index = state.vehicle.findIndex(
        (vehicle) =>
          vehicle.licensePlateNumber === action.payload.licensePlateNumber
      );
      if (index !== -1) {
        state.vehicle[index] = action.payload;
      }
    },
  },
});

export const { addVehicle, updateVehicle } = VehicleSlice.actions;
export default VehicleSlice.reducer;
