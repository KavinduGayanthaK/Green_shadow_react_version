import { CropModel } from "@/models/CropModel";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

const initialState :{crop:CropModel[]} = {crop:[]}

const api = axios.create({
    baseURL: "http://localhost:3000/crop",
  });
  
  export const saveCrop = createAsyncThunk(
    'crop/addCrop',
    async (crop:CropModel) =>{
      try {
        const response = await api.post('/add',crop);
        return response.data;
      }catch(error) {
        return error;
      }
    }
  );
  
  export const getCrop = createAsyncThunk(
    'crop/getAllCrop',
    async () =>{
      const response = await api.get('/getAllVehicle');
      return response.data;
    }
  )
  
  export const updateCrop = createAsyncThunk(
    'crop/updateCrop',
      async (crop:CropModel)=>{
          try{
              const response = await api.put(`/update/${crop.cropCode}`,crop);
              return response.data;
          }catch (error){
              return error;
          }
      }
  )
  
  export const deleteCrop = createAsyncThunk(
    'crop/deleteCrop',
    async (cropCode:string)=>{
        try{
            const response = await api.delete(`/delete/${cropCode}`);
            return response.data;
        }catch (error){
            return error;
        }
    }
  );
  
  
  const CropSlice = createSlice({
    name: "crop",
    initialState,
    reducers:{},
    extraReducers: builder=> {
      builder
        .addCase(saveCrop.fulfilled, (state, action) =>{
          state.crop.push(action.payload)
        })
        .addCase(saveCrop.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(saveCrop.rejected, (state, action) =>{
          console.log("Failed to save crop:",action.payload);
        })
        .addCase(getCrop.fulfilled, (state, action) => {
          state.crop = action.payload; // Ensure the fetched array replaces the state
        })
        .addCase(getCrop.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(getCrop.rejected, (state, action) =>{
          console.log("Failed to get crop:",action.payload);
        })
        .addCase(updateCrop.fulfilled, (state, action) =>{
          state.crop.push(action.payload)
        })
        .addCase(updateCrop.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(updateCrop.rejected, (state, action) =>{
          console.log("Failed to update crop:",action.payload);
        })
        .addCase(deleteCrop.fulfilled, (state, action) =>{
          state.crop.push(action.payload)
        })
        .addCase(deleteCrop.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(deleteCrop.rejected, (state, action) =>{
          console.log("Failed to delete crop:",action.payload);
        })
        
    }
  });
export default CropSlice.reducer;