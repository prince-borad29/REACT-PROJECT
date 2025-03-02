import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Navbar, Footer } from "./Component";
import { useDispatch, useSelector } from "react-redux";
import authService from "./firebase/auth";
import { login, logout } from "./store/expenseSlice";


function App() {


  const dispatch = useDispatch()

  const [loader, setLoader] = useState(true)
  const auth = useSelector(state => state.expenseReducer.isLoggedIn)

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user))
        }
        else {
          dispatch(logout())
        }
      })
      .catch((error) => console.log(`ERROR :: APP :: `, error))
      .finally(() => setLoader(false))
  }, [])

  return loader ? (<Spinner />)
    :
    (
      <div className="dark:bg-gray-800 dark:text-white mx-auto p-6 min-h-screen ">
        {auth && <Navbar />}
        <Outlet />
        {auth && <Footer />}
      </div>
    )
}



export default App;
