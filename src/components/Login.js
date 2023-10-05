import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [credentials, setcredentials] = useState({ username: "", password: "" })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/admin/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    if (json.username === credentials.username) {
      console.log(json.accessToken)
      sessionStorage.setItem('accessToken', json.accessToken);
      navigate("/home")
    }
    else {
      alert("Invalid Credentials")
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div><div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <h1>Welcome to Login Page</h1>
        <div className="form-group">
          <label htmlFor="username">username address</label>
          <input type="text" className="form-control" id="username" name='username' value={credentials.username} onChange={onChange} aria-describedby="usernameHelp" placeholder="Enter username" />
          <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary" > Login</button>
        <a className="btn btn-outline-primary mx-2" href="/register" role='button'>Register</a>
      </form>
    </div></div>
  )
}

export default Login;
