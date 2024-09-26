import React, { useEffect } from 'react'
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode"


export let AuthContext = createContext(null)
export default function AuthContextProvider(props) {
  const [LoginData, SetLoginData] = useState(null)
  const SaveLoginData = () => {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    SetLoginData(decode)
    // console.log(decode)
  }
  useEffect(() => {
    if (localStorage.getItem("token")) SaveLoginData()
    
  }, [])
  return (
    <AuthContext.Provider value={{LoginData,SaveLoginData}}>
      {props.children}
    </AuthContext.Provider>
  )
}
