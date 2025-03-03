import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid : null,
    useremail : null,
    data : [],
    change : true,
    income : 0,
    expense : 0,
    balance : 0,
    darkTheme : false ,
    isLoggedIn : false
}

const expenseSlice = createSlice({
    name : "expense",
    initialState,
    reducers:{
        setDoc : (state,action) => {
            state.data = action.payload
        },
        changeInDoc : (state) => {
            // state.data = state.data.filter(data => data.id !== action.payload) 
            state.change = !state.change
        },
        setBalance : (state,action) => {
            state.balance = action.payload
        },
        setIncome : (state,action) => {
            state.income = action.payload
        },
        setExpense : (state,action) => {
            state.expense = action.payload
        },
        changeTheme : (state) => {
            state.darkTheme = !state.darkTheme
        },
        login : (state,action) => {
            // const {id,email} = 
            
            state.isLoggedIn = true
            state.uid = action.payload.id
            state.useremail = action.payload.email
        },
        logout : (state) => {
            state.isLoggedIn = false
            state.id = null
            state.useremail = null
            state.data = {}
            state.balance = 0
            state.income = 0
            state.expense = 0
        }

    }

})

export const { setDoc, changeInDoc , setBalance , setExpense , setIncome , changeTheme , login , logout} = expenseSlice.actions;

export default expenseSlice.reducer;