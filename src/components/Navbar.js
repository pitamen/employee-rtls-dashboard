import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ users, setSelectedUser, selectedUser }) => {

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  }

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
                <Link className={`nav-link`} aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link`} to="/">History</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 {selectedUser ? selectedUser.name : 'Users'}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {users.map((user) => (
                    <li key={user.id}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedUser(user);
                        }}
                      >
                        {user.name}
                      </button>
                    </li>
                  ))}
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