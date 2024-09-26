import React from 'react'
import StyleNotfound from "./Notfound.module.css"
import { Button } from 'react-bootstrap'
import img from "../../../../assets/74297541930ad229a0eda19379889be7.png"
import imgheader from "../../../../assets/NotfoundImg.svg"
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
    const navigate = useNavigate()
    const handelback = () => {
        navigate("/dashboard/home")
    }
    return (
        <>
            <div className={StyleNotfound.contaner} >
                <div className={StyleNotfound.TitleFound}>
                    <div className={StyleNotfound.Headimg}>
                        <img src={img} alt="logo-img-food" />
                    </div>
                    <div className={StyleNotfound.MainTitle}>
                        <div className={StyleNotfound.Title}>
                            <h1>o<span>ops.</span><h3>page not found</h3>...</h1>

                            <p>This Page doesn’t exist or was removed!
                                We suggest you  back to home.</p>
                        </div>
                        <div className={StyleNotfound.ButtonBack}><Button onClick={handelback}><box-icon name='left-arrow-alt' color="white"></box-icon> back to home</Button></div>
                    </div>

                </div>
                <div className={StyleNotfound.notfound}>
                    <img src={imgheader} alt="logo-Notfound" />
                </div>
            </div>

        </>

    )
}
