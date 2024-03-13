import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../img/NamebarBg.jpg'; 

const Login = () => {

  const [credentials, setcredentials] = useState({ username: "", password: "" })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username, password: credentials.password })
    });
    const json = await response.json();

    if (json.data.username === credentials.username) {
      console.log(json.accessToken)
      sessionStorage.setItem('accessToken', json.accessToken);
      navigate("/")
    }
    else {
      alert("Invalid Credentials")
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div style={{
      // backgroundImage: `url(${backgroundImg})`, // Replace with the actual path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
      <div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
        <form onSubmit={handleSubmit}>
          <h1 >Welcome to Login Page</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name='username' value={credentials.username} onChange={onChange} aria-describedby="usernameHelp" placeholder="Enter username" />
            <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
          </div>
          <div className="form-group form-check my-2">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <div className='my-2'>
            <button type="submit" className="btn btn-primary" > Login</button>
            <a className="btn btn-outline-primary mx-2" href="/register" role='button'>Register</a>
          </div>
        </form>
      </div></div>
  )
}

export default Login;
