import { CropModel } from "@/models/CropModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState :{crop:CropModel[]} = {crop:[]}

const CropSlice = createSlice({
    name:'crop',
    initialState,
    reducers: {
        addCrop: (state,action:PayloadAction<CropModel>)=>{
            state.crop.push(action.payload);
        },
        updateCrop: (state,action:PayloadAction<CropModel>)=>{
            const index = state.crop.findIndex(
                (crop)=>{
                    crop.cropCode = action.payload.cropCode;
                }
            );
            if(index !== -1) {
                state.crop[index] = action.payload
            }
        }
    }
})