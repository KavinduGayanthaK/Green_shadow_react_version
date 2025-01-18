import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VehicleModel } from "@/models/VehicleModel"; // Import your VehicleModel class

// Initial state for the slice
const initialState: { vehicle: VehicleModel[] } = { vehicle: [] };

const VehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    // Add a vehicle
    addVehicle: (state, action: PayloadAction<VehicleModel>) => {
      state.vehicle.push(action.payload);
    },
    // Update a vehicle
    updateVehicle: (state, action: PayloadAction<VehicleModel>) => {
      const index = state.vehicle.findIndex(
        (vehicle) =>
          vehicle.licensePlateNumber === action.payload.licensePlateNumber
      );
      if (index !== -1) {
        state.vehicle[index] = action.payload;
      }
    },
    //Delete vehicle
    deleteVehicle: (state, action: PayloadAction<{ licensePlateNumber: string }>) => {
        state.vehicle = state.vehicle.filter(
          (vehicle) => vehicle.licensePlateNumber !== action.payload.licensePlateNumber
        );
      },
      
  },
});

export const { addVehicle, updateVehicle,deleteVehicle } = VehicleSlice.actions;
export default VehicleSlice.reducer;
