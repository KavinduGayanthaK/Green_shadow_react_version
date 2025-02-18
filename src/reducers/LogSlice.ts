import { LogModel } from "@/models/LogModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState: {log:LogModel[]} = {log:[]}

const api = axios.create({
    baseURL: "http://localhost:3000/log",
  });
  
  export const saveLog = createAsyncThunk(
    'log/addLog',
    async (log:LogModel) =>{
      try {
        const response = await api.post('/add',log);
        return response.data;
      }catch(error) {
        return error;
      }
    }
  );
  
  export const getLog= createAsyncThunk(
    'log/getAllLog',
    async () =>{
      const response = await api.get('/getAllLog');
      return response.data;
    }
  )
  
  export const updateLog = createAsyncThunk(
    'log/updateLog',
      async (log:LogModel)=>{
          try{
              const response = await api.put(`/update/${log.logCode}`,log);
              return response.data;
          }catch (error){
              return error;
          }
      }
  )
  
  export const deleteLog= createAsyncThunk(
    'log/deleteLog',
    async (logCode:string)=>{
        try{
            const response = await api.delete(`/delete/${logCode}`);
            return response.data;
        }catch (error){
            return error;
        }
    }
  );
  
  
  const LogSlice = createSlice({
    name: "log",
    initialState,
    reducers:{},
    extraReducers: builder=> {
      builder
        .addCase(saveLog.fulfilled, (state, action) =>{
          state.log.push(action.payload)
        })
        .addCase(saveLog.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(saveLog.rejected, (state, action) =>{
          console.log("Failed to save log:",action.payload);
        })
        .addCase(getLog.fulfilled, (state, action) => {
          state.log = action.payload; // Ensure the fetched array replaces the state
        })
        .addCase(getLog.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(getLog.rejected, (state, action) =>{
          console.log("Failed to get log:",action.payload);
        })
        .addCase(updateLog.fulfilled, (state, action) =>{
          state.log.push(action.payload)
        })
        .addCase(updateLog.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(updateLog.rejected, (state, action) =>{
          console.log("Failed to update log:",action.payload);
        })
        .addCase(deleteLog.fulfilled, (state, action) =>{
          state.log.push(action.payload)
        })
        .addCase(deleteLog.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(deleteLog.rejected, (state, action) =>{
          console.log("Failed to delete log:",action.payload);
        })
        
    }
  });
export default LogSlice.reducer;