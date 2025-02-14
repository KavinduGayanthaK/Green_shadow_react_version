import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StaffModel } from "@/models/StaffModel";
import axios from "axios";

// Initial state for the slice
const initialState: { staff: StaffModel[] } = { staff: [] };

const api = axios.create({
  baseURL: "http://localhost:3000/staff",
});

export const saveStaff = createAsyncThunk(
  'staff/addStaff',
  async (staff:StaffModel) =>{
    try {
      const response = await api.post('/add',staff);
      return response.data;
    }catch(error) {
      return error;
    }
  }
);

export const getStaff = createAsyncThunk(
  'staff/getAllStaff',
  async () =>{
    const response = await api.get('/getAllStaff');
    return response.data;
  }
)

export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
    async (staff:StaffModel)=>{
        try{
            const response = await api.put(`/update/${staff.staffId}`,staff);
            return response.data;
        }catch (error){
            return error;
        }
    }
)

export const deleteStaff = createAsyncThunk(
  'stafff/deleteStaff',
  async (staffId:string)=>{
      try{
          const response = await api.delete(`/delete/${staffId}`);
          return response.data;
      }catch (error){
          return error;
      }
  }
);


const StaffSlice = createSlice({
  name: "staff",
  initialState,
  reducers:{},
  extraReducers: builder=> {
    builder
      .addCase(saveStaff.fulfilled, (state, action) =>{
        state.staff.push(action.payload)
      })
      .addCase(saveStaff.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(saveStaff.rejected, (state, action) =>{
        console.log("Failed to save staff:",action.payload);
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.staff = action.payload; // Ensure the fetched array replaces the state
      })
      .addCase(getStaff.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(getStaff.rejected, (state, action) =>{
        console.log("Failed to get staff:",action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) =>{
        state.staff.push(action.payload)
      })
      .addCase(updateStaff.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(updateStaff.rejected, (state, action) =>{
        console.log("Failed to update staff:",action.payload);
      })
      .addCase(deleteStaff.fulfilled, (state, action) =>{
        state.staff.push(action.payload)
      })
      .addCase(deleteStaff.pending, (state, action) =>{
        console.log(action.payload);
      })
      .addCase(deleteStaff.rejected, (state, action) =>{
        console.log("Failed to delete staff:",action.payload);
      })
      
  }
});


export default StaffSlice.reducer;
