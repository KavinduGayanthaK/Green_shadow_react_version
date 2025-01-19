import EquipmentSlice from "@/reducers/EquipmentSlice";
import FieldSlice from "@/reducers/FieldSlice";
import StaffSlice from "@/reducers/StaffSlice";
import VehicleSlice from "@/reducers/VehicleSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer : {
        staff:StaffSlice,
        vehicle:VehicleSlice,
        equipment:EquipmentSlice,
        field:FieldSlice
    }
})