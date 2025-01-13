import { createSlice } from "@reduxjs/toolkit"

const initialState = {staff:[]}

const StaffSlice = createSlice({
    name:"staff",
    initialState:initialState,
    reducers: {
        addStaff: (state,action) =>{
            state.staff = action.payload;
        }
    }
});

export const {addStaff} = StaffSlice.actions;
export default StaffSlice.reducer;