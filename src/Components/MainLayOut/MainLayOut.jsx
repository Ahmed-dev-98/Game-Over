import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function MainLayOut({localStorageData , setlocalStorageData} ) {

let navigate = useNavigate()
  function logOut () {
    localStorage.removeItem("userToken")
    setlocalStorageData(null)
    navigate("/login")
  }
  return (
    <>
    <NavBar localStorageData={localStorageData}  logOut={logOut} />

    <Outlet  />

    
    
    </>
  )
}
