import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "", cpassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch(BASE_URL + "users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    if (json.status) {
      localStorage.setItem('token', json.authtoken);
      alert(json.message);
      navigate("/login");
      setCredentials({ username: "", password: "", cpassword: "" });
      setError(""); // Clear any existing error messages
    } else {
      alert(json.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div id='registerBg'>
      <div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
        <form onSubmit={handleSubmit}>
          <h2>Register Here..</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" id="username" onChange={onChange} name='username' placeholder="Enter Username" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name='password' placeholder="Password" required minLength={5} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' placeholder="Confirm Password" required minLength={5} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn btn-danger my-2">Register</button>
          <a className="btn btn-outline-secondary mx-2" href="/login" role='button'>Login</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
