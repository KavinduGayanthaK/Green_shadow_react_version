import { createSlice } from "@reduxjs/toolkit"

const initialState = {vehicle:[]}

const VehicleSlice = createSlice({
    name:"vehicle",
    initialState : initialState,
    reducers : {
        addVehicle:(state, action)=>{
            state.vehicle.push(action.payload);
        }
    }
})

export const {addVehicle} = VehicleSlice.actions;
export default VehicleSlice.reducer;