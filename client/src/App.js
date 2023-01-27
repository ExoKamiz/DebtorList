import { Route, Routes, Router, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import MyDebtors from "./components/MyDebtors"    
function App() {
const user = localStorage.getItem("token")

return (
    <>

      <Main />
      <Routes>
        {<Route path="/main" element={<Main />} />}
        <Route path="/" element={(user && <MyDebtors />) || (!user && <Login />)} />  
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/signup" element={<Signup />} />}
      </Routes>

    </>

)
}
export default App
