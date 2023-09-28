import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register'
import { useEffect, useState } from 'react';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuthenticated || token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
}
function App() {
  const [isAuthenticated, setIsAdminAuthenticated] = useState(false)
  useEffect(() => {
    // Check if the user has an authentication token in sessionStorage
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path="/home"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/home" element={<Home />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
