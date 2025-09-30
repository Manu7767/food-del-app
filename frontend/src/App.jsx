import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Login from './components/Login'
import Navbar from './components/Navbar'
import Reg from './components/Reg'
import Admindash from './components/Admindash'
import UserDash from './components/UserDash'
import { contextapi } from './Contextapi'
import AdminInsertForm from './components/AdminInsertForm'
import AllFoodlist from './components/AllFoodlist'
import Adminfoodupdate from './components/Adminfoodupdate'
import Cartpage from './components/Cartpage'
import ProtectedRoute from '../src/components/ProtectedRoutes'

const App = () => {

    const getCart = ()=>{
    const cart = localStorage.getItem("cart");
    if(cart){
      return JSON.parse(cart);
    }
    return {}
  }

  const [loginname, setLoginName] = useState(localStorage.getItem("loginname"));
    const [cart, setCart] = useState(getCart());
  return (
    <div>
      <Router>
        <contextapi.Provider value={{ loginname, setLoginName , cart  , setCart }} >
          <Navbar />
          <Routes>
                  <Route path="/" element={<UserDash/>} />
            <Route path="/Register" element={<Reg />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/admindash" element={ <ProtectedRoute><Admindash /></ProtectedRoute>  } />
            <Route path="/userdashboard" element={ <ProtectedRoute><UserDash /></ProtectedRoute> } />
            <Route path="/Admin_add_Foods" element={<ProtectedRoute><AdminInsertForm /></ProtectedRoute>} />
            <Route path="/show_allFood_details" element={<ProtectedRoute><AllFoodlist /></ProtectedRoute>} />
            <Route path="/adminproductupdate/:id" element={<ProtectedRoute><Adminfoodupdate /></ProtectedRoute>} />
                <Route path="/addtocartpage" element={ <ProtectedRoute><Cartpage /></ProtectedRoute>} />
          </Routes>
        </contextapi.Provider>
      </Router>
    </div>
  )
}

export default App