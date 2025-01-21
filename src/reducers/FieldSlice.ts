import { FieldModel } from "@/models/FieldModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : {field:FieldModel[]} = {field:[]}

const FieldSlice = createSlice({
    name:"field",
    initialState,
    reducers : {
        addField: (state,action:PayloadAction<FieldModel>)=>{
            state.field.push(action.payload);
        },
        updateField: (state, action:PayloadAction<FieldModel>)=>{
            const index = state.field.findIndex(
                (field) =>
                    field.fieldCode = action.payload.fieldCode
            );
            if (index !== -1) {
                state.field[index] = action.payload;
            }
        },
        deleteField:(state,action:PayloadAction<{fieldCode:string}>) =>{
            state.field = state.field.filter(
                (field) => field.fieldCode != action.payload.fieldCode
            );
        }
    }
});

export const { addField,updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer;