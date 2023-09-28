import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  }

  let location = useLocation();
  useEffect(() => {
  }, [location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">LTS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">History</Link>
              </li>
              <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>

              <button className="btn btn-outline-success mx-2" onClick={handleLogout}>Logout</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar;