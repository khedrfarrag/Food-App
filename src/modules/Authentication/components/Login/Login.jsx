import React, { useContext, useState } from "react";
import StyleLogin from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import imglogin from "../../../../assets/74297541930ad229a0eda19379889be7.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../../../Context/AuthContext";

export default function Login() {
  const { SaveLoginData } = useContext(AuthContext);

  let [show, Setshow] = useState(false);

  const handelnoShowing = (e) => {
    Setshow(false);
    console.log(e);
  };
  const handelShowing = () => {
    Setshow(true);
  };

  let [submit, Setsubmit] = useState(false);
  const SpinnerSub = () => {
    Setsubmit(true);
    setTimeout(() => Setsubmit(false), 1000);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  let navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let respons = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );

      localStorage.setItem("token", respons.data.token);
      SaveLoginData();
      console.log(SaveLoginData);
      toast.success("Login successfuliy");
      navigate("/dashboard");
      console.log(respons);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className={StyleLogin.contaner}>
        <div className={StyleLogin.bookingform}>
          <img src={imglogin} alt="login-logo" className={StyleLogin.imgLogo} />
          <div className={StyleLogin.LoginTitle}>
            <h1>log in</h1>
            <p>welcome back! please enter your details</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={StyleLogin.MainForm}
          >
            <div className={StyleLogin.mainEmail}>
              <box-icon name="envelope" size="30px"></box-icon>
              <input
                type="text"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email should be valid ",
                  },
                })}
              />
            </div>
            {errors.email ? (
              <p className="text-danger">{errors.email.message}</p>
            ) : (
              ""
            )}

            <div className={StyleLogin.mainpassword}>
              <box-icon name="lock-alt" size="30px"></box-icon>
              <input
                type={show ? "text" : "password"}
                name="Password"
                placeholder="Password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "password should be valid Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
                  },
                })}
              />
              {show && (
                <span>
                  <box-icon
                    onClick={handelnoShowing}
                    name="show-alt"
                    size="25px"
                  ></box-icon>
                </span>
              )}
              {!show && (
                <span>
                  <box-icon
                    onClick={handelShowing}
                    name="hide"
                    size="25px"
                  ></box-icon>
                </span>
              )}
            </div>
            {errors.password ? (
              <p className="text-danger">{errors.password.message} </p>
            ) : (
              ""
            )}
            <div className={StyleLogin.regisForgit}>
              <Link to={"/register"}>
                <span>register new?</span>
              </Link>
              <Link to={"/forget"}>
                <span>forget password?</span>
              </Link>
            </div>
            <Button
              type="submit"
              onClick={SpinnerSub}
              className={StyleLogin.btn1}
            >
              login
            </Button>
            {submit && (
              <Spinner
                animation="border"
                variant="primary"
                className={StyleLogin.Spinners}
              />
            )}

            {/* <a href="#" type="submit" className={StyleLogin.btn1}>log in</a> */}
          </form>
        </div>
      </div>
    </>
  );
}
