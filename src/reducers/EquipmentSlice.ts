import { EquipmentModel } from "@/models/EquipmentModel";
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState : {equipment:EquipmentModel[]} = {equipment:[]}

const api = axios.create({
    baseURL: "http://localhost:3000/equipment",
  });
  
  export const saveEquipment = createAsyncThunk(
    'equipment/addEquipment',
    async (equipment:EquipmentModel) =>{
      try {
        const response = await api.post('/add',equipment);
        return response.data;
      }catch(error) {
        return error;
      }
    }
  );
  
  export const getEquipment= createAsyncThunk(
    'equipment/getAllEquipment',
    async () =>{
      const response = await api.get('/getAllVehicle');
      return response.data;
    }
  )
  
  export const updateEquipment = createAsyncThunk(
    'equipment/updateCrop',
      async (equipment:EquipmentModel)=>{
          try{
              const response = await api.put(`/update/${equipment.equipmentId}`,equipment);
              return response.data;
          }catch (error){
              return error;
          }
      }
  )
  
  export const deleteEquipment = createAsyncThunk(
    'equipment/deleteEquipment',
    async (equipmentId:string)=>{
        try{
            const response = await api.delete(`/delete/${equipmentId}`);
            return response.data;
        }catch (error){
            return error;
        }
    }
  );
  
  
  const EquipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers:{},
    extraReducers: builder=> {
      builder
        .addCase(saveEquipment.fulfilled, (state, action) =>{
          state.equipment.push(action.payload)
        })
        .addCase(saveEquipment.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(saveEquipment.rejected, (state, action) =>{
          console.log("Failed to save equipment:",action.payload);
        })
        .addCase(getEquipment.fulfilled, (state, action) => {
          state.equipment = action.payload; // Ensure the fetched array replaces the state
        })
        .addCase(getEquipment.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(getEquipment.rejected, (state, action) =>{
          console.log("Failed to get equipment:",action.payload);
        })
        .addCase(updateEquipment.fulfilled, (state, action) =>{
          state.equipment.push(action.payload)
        })
        .addCase(updateEquipment.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(updateEquipment.rejected, (state, action) =>{
          console.log("Failed to update equipment:",action.payload);
        })
        .addCase(deleteEquipment.fulfilled, (state, action) =>{
          state.equipment.push(action.payload)
        })
        .addCase(deleteEquipment.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(deleteEquipment.rejected, (state, action) =>{
          console.log("Failed to delete equipment:",action.payload);
        })
        
    }
  });
export default EquipmentSlice.reducer;