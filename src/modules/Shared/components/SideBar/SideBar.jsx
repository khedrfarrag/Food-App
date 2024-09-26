import React, { useContext, useEffect, useState } from 'react'
import Stylesidebar from "./sidebar.module.css"
import imgToggel from "../../../../assets/6f468c4d554a57a64ccbefd3b057934d.png"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../Context/AuthContext'
export default function SideBar() {
    const { LoginData } = useContext(AuthContext)
    // console.log(LoginData)


    let navigte = useNavigate()
    const Logout = () => {
        localStorage.removeItem("token")
        navigte("/login")
    }
    const [colaps, setColaps] = useState(false)
    const [active, setActive] = useState(false)
    const handleactive = () => {
        setActive(true)
        console.log(active)

    }
    const handlecolaps = () => {
        setColaps(true)
        console.log(colaps)
    }
    const handlecolapsTrue = () => {
        setColaps(false)
        console.log(colaps)
    }


    useEffect(() => {

    }, [])
    return (
        <>

            {!colaps && <div className={Stylesidebar.contanerSidbar}>
                <div className={Stylesidebar.Sidebar}>
                    <div className={Stylesidebar.imag}>
                        <img onClick={handlecolaps} src={imgToggel} alt="" />
                    </div>

                    <ul className={Stylesidebar.MainList}>
                        <div onClick={handleactive} className={Stylesidebar.HeroHome} id={Stylesidebar.active}>
                            <box-icon name='home' color="white"></box-icon>
                            <NavLink to={"home"} >Home</NavLink >
                        </div>
                        {LoginData?.userGroup == "SuperAdmin" ? <div className={Stylesidebar.HeroUser}>
                            <box-icon name='user' color="white"></box-icon>
                            <NavLink to={"users"}>Users</NavLink >
                        </div> : ""}
                        <div className={Stylesidebar.HeroRecipse}>
                            <box-icon name='bowl-hot' color="white" type='solid' ></box-icon>
                            <NavLink to={"recipes"}>Recipes</NavLink >
                        </div>
                        {LoginData?.userGroup == "SuperAdmin" ? <div className={Stylesidebar.category}>
                            <box-icon name='category' color="white"></box-icon>
                            <NavLink to={"categories"}>Category</NavLink >
                        </div> : ""}
                        {LoginData?.userGroup == "SuperAdmin" ? <div className={Stylesidebar.Changepass}>
                            <box-icon name='lock-open-alt' color="white"></box-icon>
                            <NavLink to={"/forget"}>Change password</NavLink >
                        </div> : ""}
                        {LoginData?.userGroup !== "SuperAdmin" ? <div className={Stylesidebar.Changepass}>
                            <box-icon name='lock-open-alt' color="white"></box-icon>
                            <NavLink to={"/favorets"}>Favorets</NavLink >
                        </div> : ""}
                        <div className={Stylesidebar.Logout}>
                            <box-icon name='log-out' color="white"></box-icon>
                            <NavLink onClick={Logout} to={"/"}>logout</NavLink >
                        </div>
                    </ul>
                </div>
            </div>
            }






            {colaps && <div className={Stylesidebar.contanerClaps}>
                <div className={Stylesidebar.Sidebar}>
                    <div className={Stylesidebar.imag}>
                        <img onClick={handlecolapsTrue} src={imgToggel} alt="" />
                    </div>

                    <ul className={Stylesidebar.Colaps}>
                        <div className={Stylesidebar.HeroHome} id={Stylesidebar.active}>

                            <NavLink to={"home"}><box-icon name='home' color="white"></box-icon></NavLink >
                        </div>
                        {LoginData?.userGroup == "SuperAdmin" ? <div className={Stylesidebar.HeroUser}>

                            <NavLink to={"users"}><box-icon name='user' color="white"></box-icon></NavLink >
                        </div> : ""}
                        <div className={Stylesidebar.HeroRecipse}>

                            <NavLink to={"recipes"}><box-icon name='bowl-hot' color="white" type='solid' ></box-icon></NavLink >
                        </div>
                        {LoginData?.userGroup == "SuperAdmin" ? <div className={Stylesidebar.category}>

                            <NavLink to={"categories"}><box-icon name='category' color="white"></box-icon></NavLink >
                        </div> : ""}
                        {LoginData?.userGroup == "SuperAdmin" ? <div className={Stylesidebar.Changepass}>

                            <NavLink to={"/forget"}><box-icon name='lock-open-alt' color="white"></box-icon></NavLink >
                        </div> : ""}
                        {LoginData?.userGroup !== "SuperAdmin" ? <div className={Stylesidebar.Changepass}>

                            <NavLink to={"/favorets"}><box-icon name='lock-open-alt' color="white"></box-icon></NavLink >
                        </div> : ""}
                        <div className={Stylesidebar.Logout}>

                            <NavLink onClick={Logout} to={"/"}><box-icon name='log-out' color="white"></box-icon></NavLink >
                        </div>
                    </ul>


                </div>


            </div>
            }


        </>

    )
}

