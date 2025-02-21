import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {},
    change : true
}

const expenseSlice = createSlice({
    name : "expense",
    initialState,
    reducers:{
        setDoc : (state,action) => {
            state.data = action.payload
        },
        deleteDoc : (state,action) => {
            state.data = state.data.filter(data => data.id !== action.payload) 
            state.change = !state.change
        }
    }

})

export const {setDoc,deleteDoc} = expenseSlice.actions;

export default expenseSlice.reducer;