import StaffSlice from "@/reducers/StaffSlice";
import { configureStore } from "@reduxjs/toolkit";
import { uptime } from "process";

export const store = configureStore({
    reducer : {
        addStaff:StaffSlice,
        updateStaff:StaffSlice
    }
})