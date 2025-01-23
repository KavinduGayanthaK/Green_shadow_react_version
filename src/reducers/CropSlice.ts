import { CropModel } from "@/models/CropModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState :{crop:CropModel[]} = {crop:[]}

const CropSlice = createSlice({
    name:'crop',
    initialState,
    reducers: {
        addCrop: (state,action:PayloadAction<CropModel>)=>{
            state.crop.push(action.payload);
        }
    }
})