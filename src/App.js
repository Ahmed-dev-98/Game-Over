import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import './App.css'
import All from './Components/All/All'
import Categories from './Components/Categories/Categories'
import Details from './Components/Details/Details'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import MainLayOut from './Components/MainLayOut/MainLayOut'
import NotFound from './Components/NotFound/NotFound'
import Platforms from './Components/Platforms/Platforms'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Register from './Components/Register/Register'
import SortBy from './Components/SortBy/SortBy'


export default function App() {
    useEffect(() => {
    if (localStorage.getItem("userToken")!== null) {
      saveUserToken()
    }
    else{
    }
  },[])
  

  const [localStorageData, setlocalStorageData] = useState(null)

  let routers = createHashRouter([{
    path:"/",element:<MainLayOut localStorageData={localStorageData}  setlocalStorageData={setlocalStorageData} /> ,children : [
    
        {index: true ,element:<ProtectedRoute localStorageData={localStorageData}><Home/></ProtectedRoute>},
        {path: 'home' ,element:<ProtectedRoute localStorageData={localStorageData}><Home/></ProtectedRoute>},
        {path: 'Platforms/:platform',element:<ProtectedRoute localStorageData={localStorageData}><Platforms/></ProtectedRoute>},
        {path: 'sortBy/:sortby',element:<ProtectedRoute localStorageData={localStorageData}><SortBy/></ProtectedRoute>},
        {path: 'all',element:<ProtectedRoute localStorageData={localStorageData}><All/></ProtectedRoute> },
        {path: 'categories/:genre',element:<ProtectedRoute localStorageData={localStorageData}><Categories/></ProtectedRoute>},
        {path: 'login',element:<Login saveUserToken={saveUserToken} />},
        {path: 'register',element:<Register/>},
        {path: 'details/:id',element:<ProtectedRoute localStorageData={localStorageData}><Details/></ProtectedRoute> },

        {path : "*" , element :<ProtectedRoute localStorageData={localStorageData}><NotFound/></ProtectedRoute> }

    ]}])



function saveUserToken() {

  let codedToken = localStorage.getItem("userToken")
  let decodedToken = jwtDecode(codedToken)

setlocalStorageData(decodedToken)
  
}

  return (
    <>
      <RouterProvider router={routers}/>   


  </>
  )
}
