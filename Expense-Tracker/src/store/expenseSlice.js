import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {}
}

const expenseSlice = createSlice({
    name : "expense",
    initialState,
    reducers:{
        setDoc : (state,action) => {
            state.data = action.payload
        }
    }

})

export const {setDoc} = expenseSlice.actions;

export default expenseSlice.reducer;