import StaffSlice from "@/reducers/StaffSlice";
import VehicleSlice from "@/reducers/VehicleSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer : {
        staff:StaffSlice,
        vehicle:VehicleSlice,
    }
})