import React, { useState } from 'react'
import StyleVerify from "./Verify.module.css"
import imglogin from "../../../../assets/74297541930ad229a0eda19379889be7.png"
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios"
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { USERPORTAL } from '../../../Constants/ENDPOINT'

export default function Verify() {
  const navigate=useNavigate()


  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onsubmit = async (data) => {
   try{
    const response = await axios.put(USERPORTAL.putVerify, data)
    toast.success("successfly create email please sigin by your email and password ")
    toast.success(response.data.message)
    navigate("/")
    console.log(response.data)
   }
   catch(errors){
    toast.error(errors.response.data.message)
   }
  }
//   let [submit, Setsubmit] = useState(false)
  const SpinnerSub = () => {
    // Setsubmit(true)
    // setTimeout(() => Setsubmit(false), 1000)
  }

  return (
    <div className={StyleVerify.contaner}>

    <div className={StyleVerify.bookingform}>
      <img src={imglogin} alt="login-logo" className={StyleVerify.imgLogo} />
      <div className={StyleVerify.LoginTitle}>
        <h1>verify?</h1>
        <p>no wornes please enter email and verify we will send signin</p>
      </div>
      <form onSubmit={handleSubmit(onsubmit)} className={StyleVerify.MainForm}>
        <div className={StyleVerify.mainEmail}>
          <box-icon name='envelope' size="30px" ></box-icon>
          <input type="text" name="email" placeholder="Email"
            {
            ...register("email", {
              required: "Email Is Required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{3,4}$/,
                message: "Email Should Be Valid "
              }
            })
            }
          />
        </div>
        {errors.email && <p className={StyleVerify.error}>{errors.email.message}</p>}



        <div className={StyleVerify.mainEmail}>
        <box-icon type='solid' name='bell-ring'></box-icon>
          <input type="text" name="code" placeholder="verify"
            {
            ...register("code", {
              required: "verify Is Required"
            })
            }
          />
        </div>
        {errors.verify && <p className={StyleVerify.error}>{errors.verify.message}</p>}

        <Button type='submit' onClick={SpinnerSub} className={StyleVerify.btn1}>submit</Button>
        {/* {submit && <Spinner animation="border" variant="primary" className={StyleVerify.Spinners} />} */}

        {/* <a href="#" type="submit" className={StyleLogin.btn1}>log in</a> */}
      </form>
    </div>
  </div>
  )
}
