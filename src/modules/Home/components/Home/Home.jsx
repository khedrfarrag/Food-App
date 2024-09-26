import React, { useContext, useEffect } from 'react'
import Stylehome from "./home.module.css"
import { Button } from 'react-bootstrap'
import svgimg from "../../../../assets/header-home.svg"
// import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import HeaderItemsProps from '../../../Shared/components/headerItemProps/HeaderItemsProps'
import { AuthContext } from '../../../../Context/AuthContext'
// import { AuthContext } from '../../../../Context/AuthContext'

// import Spiners from '../../../Shared/components/ModalsSpiner/Spiners' 
export default function Home() {

  // let data = localStorage.getItem("token")
  // let decoded = jwtDecode(data)
  // console.log(decoded)
  const {LoginData}=useContext(AuthContext)

  let navigate=useNavigate()

  const ToRecipse=()=>{
    navigate("/dashboard/recipes")
  }
 


  return (
    <>
    
    {

    }
    <div className={Stylehome.contaner}>
      <HeaderItemsProps Title={"welcome"} TitleSpan={LoginData?.userName} Discreption={"This is a welcoming screen for the entry of the application , you can now see the options"} imag={svgimg}/>
      <div className={Stylehome.SectionFotter}>
        <div className={Stylehome.TitleSec}>
          <h1>Fill the <span>Recipes</span> !</h1>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div className={Stylehome.BtnSec}>
          <Button onClick={ToRecipse}>Fill Recipes<box-icon name='right-arrow-alt' color="white"></box-icon></Button>
        </div>

      </div>
    </div>
    
    </>
  )
}
