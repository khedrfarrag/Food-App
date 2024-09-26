import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function AuthLayout() {
  let navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/dashboard")

    }
  })
  return (
    <div className='contanerauth'>
      <div className='auth'>

      <Outlet/>
      </div>

      
    </div>
  )
}
