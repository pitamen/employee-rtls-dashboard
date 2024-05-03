import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [credentials, setcredentials] = useState({ username: "", password: "" })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL+"users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username, password: credentials.password })
    });
    const json = await response.json();

    console.log(json);

    if (json.success) {
      sessionStorage.setItem('accessToken', json.accessToken);
      navigate("/")
    }
    else {
      alert('Invalid Credentials')
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  
  return (
    <div id='loginBg'>
      <div className='container d-flex align-items-center justify-content-center' id='loginWallpaper' style={{ height: '100vh' }}>
        <form onSubmit={handleSubmit}>
          <h2>Login Here..</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name='username' value={credentials.username} onChange={onChange} required minLength={6} placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} required minLength={8} placeholder="Password" />
          </div>
          <div className="form-group form-check my-2">
            <input type="checkbox" className="form-check-input" id="Remember me" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <div className='my-2'>
            <button type="submit" className="btn btn-danger" >Login</button>
            <a className="btn btn-outline-secondary mx-2" href="/register" role='button'>Register</a>
          </div>
        </form>
      </div></div>
  )
}

export default Login;
