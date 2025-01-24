import { LogModel } from "@/models/LogModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: {log:LogModel[]} = {log:[]}

const LogSlice = createSlice({
    name:"log",
    initialState,
    reducers: {
        addLog: (state,action:PayloadAction<LogModel>)=>{
            state.log.push(action.payload)
        },
        updateLog: (state,action: PayloadAction<LogModel>)=>{
            const index = state.log.findIndex(
                (log)=>{
                    log.logCode = action.payload.logCode;
                }
            );
            if(index != -1){
                state.log[index] = action.payload;
            }
        },
        deleteLog: (state,action: PayloadAction<{logCode:string}>)=>{
            state.log = state.log.filter((log)=>log.logCode!=action.payload.logCode);
        }
    }
})

export const {addLog,updateLog,deleteLog} = LogSlice.actions;
export default LogSlice.reducer;