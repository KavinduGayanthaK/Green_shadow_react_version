import { FieldModel } from "@/models/FieldModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState : {field:FieldModel[]} = {field:[]}

const api = axios.create({
    baseURL: "http://localhost:3000/field",
  });
  
  export const saveField = createAsyncThunk(
    'field/addField',
    async (field:FieldModel) =>{
      try {
        const response = await api.post('/add',field);
        return response.data;
      }catch(error) {
        return error;
      }
    }
  );
  
  export const getField= createAsyncThunk(
    'field/getAllField',
    async () =>{
      const response = await api.get('/getAllField');
      return response.data;
    }
  )
  
  export const updateField = createAsyncThunk(
    'field/updateField',
      async (field:FieldModel)=>{
          try{
              const response = await api.put(`/update/${field.fieldCode}`,field);
              return response.data;
          }catch (error){
              return error;
          }
      }
  )
  
  export const deleteField = createAsyncThunk(
    'field/deleteField',
    async (fieldCode:string)=>{
        try{
            const response = await api.delete(`/delete/${fieldCode}`);
            return response.data;
        }catch (error){
            return error;
        }
    }
  );
  
  
  const FieldSlice = createSlice({
    name: "field",
    initialState,
    reducers:{},
    extraReducers: builder=> {
      builder
        .addCase(saveField.fulfilled, (state, action) =>{
          state.field.push(action.payload)
        })
        .addCase(saveField.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(saveField.rejected, (state, action) =>{
          console.log("Failed to save field:",action.payload);
        })
        .addCase(getField.fulfilled, (state, action) => {
          state.field = action.payload; // Ensure the fetched array replaces the state
        })
        .addCase(getField.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(getField.rejected, (state, action) =>{
          console.log("Failed to get field:",action.payload);
        })
        .addCase(updateField.fulfilled, (state, action) =>{
          state.field.push(action.payload)
        })
        .addCase(updateField.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(updateField.rejected, (state, action) =>{
          console.log("Failed to update field:",action.payload);
        })
        .addCase(deleteField.fulfilled, (state, action) =>{
          state.field.push(action.payload)
        })
        .addCase(deleteField.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(deleteField.rejected, (state, action) =>{
          console.log("Failed to delete field:",action.payload);
        })
        
    }
  });
export default FieldSlice.reducer;