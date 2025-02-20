import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expenseSlice'
const store = configureStore({
    reducer: {
        expenseReducer
    },
    // devTools: false,
})

export default store