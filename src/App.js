import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar'
import Login from './components/Login'

function App() {
  return (
    <>
    <Router>
        <Navbar/>
        <div className='container'> 
        <Routes>
          <Route exact path='/' element= {<Home/>}/>
          <Route exact path='/login' element= {<Login/>}/>
        </Routes>
        </div>
      </Router>
  
    </>
  );
}

export default App;
