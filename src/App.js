import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register'
import { useEffect, useState } from 'react';
import User from './components/User';
import LoadingBar from 'react-top-loading-bar'


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
  const [progress, setProgress] = useState(0)
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
        <div >
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route
              path="/home"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/home" element={<Home setProgress= {setProgress}/>}></Route>
            </Route>
            <Route path='/home/:user' element={<User setProgress= {setProgress}/>}></Route>
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
