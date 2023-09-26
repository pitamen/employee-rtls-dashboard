import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <>
    <Router>
        <Navbar/>
        <div className='container'> 
        <Routes>
          <Route exact path='/' element= {<Login/>}/>
          <Route exact path='/login' element= {<Login/>}/>
          <Route exact path='/register' element= {<Register/>}/>
          <Route exact path='/home' element= {<Home/>}/>
        </Routes>
        </div>
      </Router>
  
    </>
  );
}

export default App;
