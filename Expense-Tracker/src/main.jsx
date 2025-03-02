import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements , Route , RouterProvider} from 'react-router-dom'

import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpensePage";
import Reports from "./pages/Reports";
import Setting from "./pages/Setting";
import DataTest from "./pages/dataTest";
import { Login, SignUp , AuthLayout, Spinner , Navbar} from "./Component";

const router = createBrowserRouter(
  createRoutesFromElements(
        <Route path='/' element={<App />}>
           <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
          <Route path="/signUp" element={<AuthLayout authentication={false}><SignUp /></AuthLayout>} />
          <Route path="/" element={<AuthLayout authentication><Home /></AuthLayout>} />
          <Route path="/test" element={<DataTest />} />
          <Route path="/add-expense" element={<AuthLayout authentication><AddExpense /></AuthLayout>} />
          <Route path="/expenses" element={<AuthLayout authentication><ExpenseList /></AuthLayout>} />
          <Route path="/reports" element={<AuthLayout authentication><Reports /></AuthLayout>} />
          <Route path="/settings" element={<AuthLayout authentication><Setting /></AuthLayout>} />
        </Route>
      
  )
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
   // </StrictMode> 
)
