import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VehicleModel } from "@/models/VehicleModel"; // Import your VehicleModel class
import axios from "axios";

// Initial state for the slice
const initialState: { vehicle: VehicleModel[] } = { vehicle: [] };

const api = axios.create({
  baseURL: "http://localhost:3000/vehicle",
});

export const saveVehicle = createAsyncThunk(
  'vehicle/addvehicle',
  async (vehicle:VehicleModel) =>{
    try {
      const response = await api.post('/add',vehicle);
      return response.data;
    }catch(error) {
      return error;
    }
  }
);

export const getVehicle = createAsyncThunk(
  'vehicle/getAllVehicle',
  async () =>{
    const response = await api.get('/getAllVehicle');
    return response.data;
  }
)

export const updateVehicle = createAsyncThunk(
  'staff/updateStaff',
    async (vehicle:VehicleModel)=>{
        try{
            const response = await api.put(`/update/${vehicle.licensePlateNumber}`,vehicle);
            return response.data;
        }catch (error){
            return error;
        }
    }
)

export const deleteVehicle = createAsyncThunk(
  'stafff/deleteVehicle',
  async (vehicleNumber:string)=>{
      try{
          const response = await api.delete(`/delete/${vehicleNumber}`);
          return response.data;
      }catch (error){
          return error;
      }
  }
);


const VehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers:{},
  extraReducers: builder=> {
    builder
      .addCase(saveVehicle.fulfilled, (state, action) =>{
        state.vehicle.push(action.payload)
      })
      .addCase(saveVehicle.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(saveVehicle.rejected, (state, action) =>{
        console.log("Failed to save vehicle:",action.payload);
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        state.vehicle = action.payload; // Ensure the fetched array replaces the state
      })
      .addCase(getVehicle.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(getVehicle.rejected, (state, action) =>{
        console.log("Failed to get vehicle:",action.payload);
      })
      .addCase(updateVehicle.fulfilled, (state, action) =>{
        state.vehicle.push(action.payload)
      })
      .addCase(updateVehicle.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(updateVehicle.rejected, (state, action) =>{
        console.log("Failed to update vehicle:",action.payload);
      })
      .addCase(deleteVehicle.fulfilled, (state, action) =>{
        state.vehicle.push(action.payload)
      })
      .addCase(deleteVehicle.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(deleteVehicle.rejected, (state, action) =>{
        console.log("Failed to delete vehicle:",action.payload);
      })
      
  }
});
export default VehicleSlice.reducer;
