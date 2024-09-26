import React from 'react'
import SideBar from "../SideBar/SideBar"
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import StyleMaster from './masterLayout.module.css'
// import StyleMaster from "./masterLayout.module.css"
export default function MasterLayout() {
  return (
    <>
      <div className={StyleMaster.contaner}>
        <div className={StyleMaster.SecsideBar}>
          <SideBar />
        </div>
        <div className={StyleMaster.naveandoutlit}>
          <NavBar />
          <Outlet />
        </div>

      </div>

    </>
  )
}
