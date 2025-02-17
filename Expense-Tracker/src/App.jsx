import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Login } from './Component'
import service from './firebase/config'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login/> */}
      <button onClick={service.createPost}>Add</button>
    </>
  )
}

export default App
