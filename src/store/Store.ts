import StaffSlice from "@/reducers/StaffSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        addStaff:StaffSlice
    }
})