import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protection({isdata,children}) {
    if(localStorage.getItem("token")||isdata)return children
    else return <Navigate to="/login"/>
  
}
