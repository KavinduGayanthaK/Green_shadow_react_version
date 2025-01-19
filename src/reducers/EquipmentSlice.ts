import { EquipmentModel } from "@/models/EquipmentModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : {equipment:EquipmentModel[]} = {equipment:[]}

const EquipmentSlice = createSlice({
    name:"equipment",
    initialState,
    reducers : {
        // Add a equipment
        addEquipment: (state,action:PayloadAction<EquipmentModel>)=>{
            state.equipment.push(action.payload);
        }
        
    }
})

export const { addEquipment} = EquipmentSlice.actions;
export default EquipmentSlice.reducer;