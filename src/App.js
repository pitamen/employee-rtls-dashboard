import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import User from './components/User';
import LoadingBar from 'react-top-loading-bar';
import { NewHome } from './components/NewHome';


const PrivateRoute = ({ isAuthenticated }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated || token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user has an authentication token in sessionStorage
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Router>
        <div>
          <LoadingBar color="#f11946" progress={progress} />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route exact path="/" element={<Home setProgress={setProgress} />} />
              <Route exact path="/:user" element={<User setProgress={setProgress} />} />
              <Route exact path="/NewHome" element={<NewHome/>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
