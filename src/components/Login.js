import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import "./SCSS/Login.scss";
import Logo from '../img/DishHome_Logo.svg.png'

const Login = () => {
  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BASE_URL + "users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const json = await response.json();
  
      console.log(response)
  
      if (response.status === 200) {
        sessionStorage.setItem("accessToken", json.accessToken);
        navigate("/");
      } else if (response.status === 401) {
        alert("Invalid Credentials, Please enter valid username and password.");
      }else{
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
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
          <div class="text-center mt-4 name">RTLS Login</div>
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
