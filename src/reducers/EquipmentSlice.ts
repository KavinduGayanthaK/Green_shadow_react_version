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
        },
        updateEquipment: (state, action:PayloadAction<EquipmentModel>)=>{
            const index = state.equipment.findIndex(
                (equipment) =>
                    equipment.equipmentId = action.payload.equipmentId
            );
            if (index !== -1) {
                state.equipment[index] = action.payload;
            }
        }
        
    }
})

export const { addEquipment,updateEquipment} = EquipmentSlice.actions;
export default EquipmentSlice.reducer;