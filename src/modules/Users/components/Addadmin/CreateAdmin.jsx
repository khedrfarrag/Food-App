import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import StyleAdmin from "./Admin.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import imglogin from "../../../../assets/74297541930ad229a0eda19379889be7.png"
import { PATTERNEMAIL, PATTERNPASSWORD, USERRLIST, } from '../../../Constants/ENDPOINT'
import { toast } from 'react-toastify'
export default function CreateAdmin() {
  let navigate = useNavigate()

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: "all" })

    let [show, Setshow] = useState(false)

    const handelnoShowing = () => {
        Setshow(false)
        // console.log(e)

    }
    const handelShowing = () => {
        Setshow(true)
    }
    const Convartdata = () => {
        const formdata = new FormData()
        formdata.append('userName', getValues('userName'))
        formdata.append('email', getValues('email'))
        formdata.append('password', getValues('password'))
        formdata.append('confirmPassword', getValues('confirmPassword'))
        formdata.append('country', getValues('country'))
        formdata.append('phoneNumber', getValues('phoneNumber'))
        formdata.append('imagePath', getValues('imagePath'))

        return formdata;

    }
    const onSubmit = async () => {
        let resConvartData = Convartdata()
        try {
            let response = await axios.post(USERRLIST.Create, resConvartData,{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })

              toast.success(response.data.message)
              navigate("/dashboard/users")

            console.log(response)
        }
        catch (error) {
            console.log(error)
              toast.error(error.response.data.message)

        }
    }

    return (

        <>
            <div className={StyleAdmin.bookingform}>
                <img src={imglogin} alt="login-logo" className={StyleAdmin.imgLogo} />
                <div className={StyleAdmin.LoginTitle}>
                    <h1>Create Admin</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={StyleAdmin.MainForm}>
                    <div className={StyleAdmin.contanerForms}>
                        <div className={StyleAdmin.RegisterLeft}>
                            <div className={errors.userName ? StyleAdmin.ErrorName : StyleAdmin.mainName}>
                                <box-icon name='mobile-alt'></box-icon>
                                <input type="text" aria-label="userName" placeholder="username"
                                    {...register("userName", {
                                        required: "name is required",
                                        minLength: { value: 4, message: "username must be at least 4 characters" }

                                    })}
                                />
                                {/* {errors.userName ? <p className='text-danger'>{errors.userName.message}  </p> : ""} */}

                            </div>
                            <div className={errors.country ? StyleAdmin.ErrorOtp : StyleAdmin.mainOtp}>
                                <box-icon name='lock-alt' size="30px" ></box-icon>
                                <input type="text" aria-label="country" placeholder="country"
                                    {...register("country", {
                                        required: "country is required",
                                        minLength: { value: 4, message: "country must be at least 4 characters" }

                                    })}
                                />
                                {/* {errors.country ? <p className='text-danger'>{errors.country.message}  </p> : ""} */}

                            </div>
                            <div className={errors.password ? StyleAdmin.errors : StyleAdmin.mainCpassword}>
                                <box-icon name='lock-alt' size="30px" ></box-icon>
                                <input type={show ? "text" : "password"} aria-label="password" placeholder="password"
                                    {...register("password", {
                                        required: "password is required",
                                        pattern: {
                                            value: PATTERNPASSWORD.value,
                                            message: PATTERNPASSWORD.message
                                        }
                                    })}
                                />
                                {show && <span ><box-icon onClick={handelnoShowing} name='show-alt' size="25px"  ></box-icon></span>}
                                {!show && <span  ><box-icon onClick={handelShowing} name='hide' size="25px"></box-icon></span>}
                                {/* {errors.password ? <p className='text-danger'>{errors.password.message}  </p> : ""} */}

                            </div>
                        </div>
                        <div className={StyleAdmin.RegisterRight}>
                            <div className={errors.email ? StyleAdmin.errors : StyleAdmin.mainCpassword}>
                                <box-icon name='lock-alt' size="30px" ></box-icon>
                                <input type="text" aria-label="email" placeholder="enter your email"
                                    {...register("email", {
                                        required: "email is required",
                                        pattern: {
                                            value: PATTERNEMAIL.value,
                                            message: PATTERNEMAIL.message
                                        }
                                    })}

                                />
                                {/* {errors.email ? <p className='text-danger'>{errors.email.message}  </p> : ""} */}

                            </div>
                            <div className={errors.phoneNumber ? StyleAdmin.errors : StyleAdmin.mainCpassword}>
                                <box-icon name='lock-alt' size="30px" ></box-icon>
                                <input type="text" aria-label="phoneNumber" placeholder="phone number"
                                    {...register("phoneNumber", {
                                        required: "phoneNumber is required",
                                    })}
                                />
                                {/* {errors.phoneNumber ? <p className='text-danger'>{errors.phoneNumber.message}  </p> : ""} */}

                            </div>
                            <div className={errors.confirmPassword ? StyleAdmin.errors : StyleAdmin.mainCpassword}>
                                <box-icon name='lock-alt' size="30px" ></box-icon>
                                < input type={show ? "text" : "password"} aria-label="confirmPassword" placeholder="confirm password"
                                    {...register("confirmPassword", {
                                        required: "confirmPassword is required",
                                        pattern: {
                                            value: PATTERNPASSWORD.value,
                                            message: PATTERNPASSWORD.message
                                        },
                                        validate: (value) =>
                                            value === getValues("password") || "password dont match"

                                    })}
                                />


                            </div>
                            {/* {errors.confirmPassword ? <p className='text-danger'>{errors.confirmPassword.message}  </p> : ""} */}
                        </div>

                    </div>

                    <div className={errors.profileImage ? StyleAdmin.ErrorImage : StyleAdmin.ImageProfile} >
                        <input type="file" name='imagePath'
                        />
                    </div>
                    {/* <Link to={"/"}>Login Now?</Link> */}

                    <Button type='submit' className={StyleAdmin.btn1}>Create</Button>
                </form>

            </div>


        </>
    )
}
