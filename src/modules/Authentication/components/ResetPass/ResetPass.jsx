import React, { useState } from 'react'
import Styleresetpass from "./resetpass.module.css"
import { Button } from 'react-bootstrap'
import imglogin from "../../../../assets/74297541930ad229a0eda19379889be7.png"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';


// const navigate = useNavigate
export default function ResetPass() {

  let [submit, Setsubmit] = useState(false)
  const SpinnerSub = () => {
    Setsubmit(true)
    setTimeout(() => Setsubmit(false),1000)
  }

  let [show, Setshow] = useState(false)
  const handlenoshow = (e) => {
    Setshow(false)
    console.log(e)
  }
  const handleshow = (e) => {
    Setshow(true)
    console.log(e)

  }

  const { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data)
      console.log(response.data)
      toast.success('Password Reset Successfully')
      navigate("/dashboard");

    }
    catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className={Styleresetpass.contaner}>

      <div className={Styleresetpass.bookingform}>
        <img src={imglogin} alt="login-logo" className={Styleresetpass.imgLogo} />
        <div className={Styleresetpass.LoginTitle}>
          <h1>log in</h1>
          <p>welcome back! please enter your details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} id="data-form" className={Styleresetpass.MainForm}>
          <div className={Styleresetpass.mainEmail}>
            <box-icon name='envelope' size="30px" ></box-icon>
            <input type="text" name="email" placeholder="Email"

              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email should be valid"
                }
              })}

            />
          </div>
          {errors.email ? <p className='text-danger'>{errors.email.message}{" "}<box-icon type='solid' name='angry' color="red"></box-icon></p> : ""}

          <div className={Styleresetpass.mainOtp}>
            <box-icon name='lock-alt' size="30px" ></box-icon>
            <input type="text" name="seed" placeholder="OTP"
              {...register("seed", {
                required: "OTP is required",

              })}

            />

          </div>
          <div className={Styleresetpass.mainNpassword}>
            <box-icon name='lock-alt' size="30px" ></box-icon>
            <input type={show ? "text" : "password"} name="password" placeholder="new password"

              {...register("password", {
                required: "password is required",
                pattern:{
                  value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:"password should be valid Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
                },
              })}
            />
            {show && <box-icon onClick={handlenoshow} name='show-alt' size="25px" ></box-icon>}

            {!show && <box-icon onClick={handleshow} name='hide' size="25px"></box-icon>}

          </div>
          {errors.password?<p className='text-danger'>{errors.password.message} {" "} <box-icon type='solid' name='angry' color="red"></box-icon></p> :""}

          <div className={Styleresetpass.mainCpassword}>
            <box-icon name='lock-alt' size="30px" ></box-icon>
            <input type={show ? "text" : "password"} name="confirmPassword" placeholder="confirm new password"
              {...register("confirmPassword", {
                required: "confirmPassword is required",
                pattern:{
                  value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:"password should be valid Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
                },
              })}
            />
            {show && <box-icon onClick={handlenoshow} name='show-alt' size="25px" ></box-icon>}

            {!show && <box-icon onClick={handleshow} name='hide' size="25px"></box-icon>}

          </div>
            {errors.password?<p className='text-danger'>{errors.password.message} {" "} <box-icon type='solid' name='angry' color="red"></box-icon></p> :""}


          <Button type='submit' onClick={SpinnerSub} className={Styleresetpass.btn1}>login</Button>
          {submit && <Spinner animation="border" variant="primary" className={Styleresetpass.Spinners} />}

          {/* <a href="#" type="submit" className={StyleLogin.btn1}>log in</a> */}
        </form>
      </div>
    </div>
  )
}
