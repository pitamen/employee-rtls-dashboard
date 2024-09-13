import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_V2 } from "../utils/constants";
import "./SCSS/Login.scss";
import Logo from '../img/fibernet-logo.jpg'

const Login = () => {
  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BASE_URL_V2 + "users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const signInResponse = await response.json();

      if (response.status === 200) {
        let location = signInResponse.data.roDetail ? signInResponse.data.roDetail.location : null;
        sessionStorage.setItem("accessToken", signInResponse.accessToken);
        sessionStorage.setItem("location", location ? JSON.stringify(location) : null)
        navigate('/');
      } else if (response.status === 401) {
        alert(signInResponse.message);
      } else {
        alert(signInResponse.message)
      }
    } catch (error) {
      alert("Something went wrong!!!", error.message)
    }

  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div id="loginBg">
      <div className='container d-flex align-items-center justify-content-center' id='loginWallpaper' style={{ height: '100vh' }}>
        <div class="wrapper" >
          <div class="logo">
            <img
              src={Logo}
              alt=""
            />
          </div>
          <div class="text-center mt-4 name">Field View Dashboard Login</div>
          <form class="p-3 mt-3" onSubmit={handleSubmit}>
            <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input
                type="text"
                className="userName"
                id="username"
                name="username"
                value={credentials.username}
                onChange={onChange}
                required
                minLength={6}
                placeholder="Enter username"
              />
            </div>
            <div class="form-field d-flex align-items-center">
              <span class="fas fa-key"></span>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
                minLength={8}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn mt-3">
              Login
            </button>
          </form>
          <div class="text-center fs-6">
            {/* <a href="#">Forget password?</a> or <a href="#">Sign up</a> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
