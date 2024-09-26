import { React, useState } from "react";
import { Button } from "react-bootstrap";
import Styleforget from "./forgetpass.module.css";
import imglogin from "../../../../assets/74297541930ad229a0eda19379889be7.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      toast.success("chick your email ");
      navigate("/reset");
      console.log(response.data);
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  };
  let [submit, Setsubmit] = useState(false);
  const SpinnerSub = () => {
    Setsubmit(true);
    setTimeout(() => Setsubmit(false), 1000);
  };
  return (
    <div className={Styleforget.contaner}>
      <div className={Styleforget.bookingform}>
        <img src={imglogin} alt="login-logo" className={Styleforget.imgLogo} />
        <div className={Styleforget.LoginTitle}>
          <h1>forget yuor password?</h1>
          <p>
            no wornes please enter email and we will send a password reset link
          </p>
        </div>
        <form
          id="data-form"
          onSubmit={handleSubmit(onsubmit)}
          className={Styleforget.MainForm}
        >
          <div className={Styleforget.mainEmail}>
            <box-icon name="envelope" size="30px"></box-icon>
            <input
              type="text"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email Is Required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{3,4}$/,
                  message: "Email Should Be Valid ",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className={Styleforget.error}>{errors.email.message}</p>
          )}
          <div className={Styleforget.linklogin}>
            <Link to={"/login"}>
              <span>Login Now?</span>
            </Link>
          </div>
          <Button
            type="submit"
            onClick={SpinnerSub}
            className={Styleforget.btn1}
          >
            submit
          </Button>
          {submit && (
            <Spinner
              animation="border"
              variant="primary"
              className={Styleforget.Spinners}
            />
          )}

          {/* <a href="#" type="submit" className={StyleLogin.btn1}>log in</a> */}
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
