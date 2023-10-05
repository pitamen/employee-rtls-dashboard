import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [credentials, setcredentials] = useState({ username: "", password: "" , cpassword:""})

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/admin/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: credentials.username, password: credentials.password, cpassword:credentials.cpassword })
      });
      const json = await response.json();
      console.log(json)
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        navigate("/login")
      }
      else{
        alert(json.message)
      }
    }
    const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div><div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <form onSubmit={handleSubmit}>
                <h1>Welcome to Register Page</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="text" className="form-control" id="username"onChange={onChange} name='username' aria-describedby="emailHelp" placeholder="Enter email" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name='password' placeholder="Password" required minLength={5} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' placeholder="Confirm-Password"  required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary my-2" > Register</button>
                <a className="btn btn-outline-primary mx-2" href="/login" role='button'>login</a>
            </form>
        </div></div>
    )
}

export default Register;
