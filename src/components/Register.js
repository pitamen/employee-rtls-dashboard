import React from 'react'

const Register = () => {
    return (
        <div><div className='container d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <form>
                <h1>Welcome to Register Page</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm-Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2" > Register</button>
                <a className="btn btn-outline-primary mx-2" href="/login" role='button'>login</a>
            </form>
        </div></div>
    )
}

export default Register;
